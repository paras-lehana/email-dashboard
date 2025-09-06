import csv
import requests
from datetime import datetime
import json
import os
from supabase import create_client, Client

# Supabase configuration
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")  # Use service role key for admin operations

if not SUPABASE_URL or not SUPABASE_KEY:
    print("[v0] Error: Supabase environment variables not found")
    print("[v0] Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set")
    exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Fetch the CSV data from the provided URL
csv_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/email_sample-6FVH33q366MHtpA0rLi0L2O4LEEzjg.csv"

print("[v0] Fetching CSV data from:", csv_url)

try:
    response = requests.get(csv_url)
    response.raise_for_status()
    
    # Parse CSV data
    csv_data = response.text
    csv_reader = csv.DictReader(csv_data.splitlines())
    
    emails = []
    
    for row in csv_reader:
        # Parse the date
        try:
            sent_date = datetime.strptime(row['sent_date'], '%Y-%m-%d %H:%M:%S')
        except:
            sent_date = datetime.now()
        
        # Analyze sentiment based on keywords
        body_lower = row['body'].lower()
        sentiment = 'neutral'
        if any(word in body_lower for word in ['urgent', 'problem', 'issue', 'error', 'broken', 'failed', 'cannot', 'blocked']):
            sentiment = 'negative'
        elif any(word in body_lower for word in ['thank', 'great', 'excellent', 'good', 'happy', 'satisfied']):
            sentiment = 'positive'
        
        # Determine priority based on subject and body
        priority = 'medium'
        subject_lower = row['subject'].lower()
        if any(word in subject_lower or word in body_lower for word in ['urgent', 'asap', 'emergency', 'critical', 'blocked']):
            priority = 'urgent'
        elif any(word in subject_lower or word in body_lower for word in ['important', 'priority', 'soon']):
            priority = 'high'
        elif any(word in subject_lower or word in body_lower for word in ['question', 'info', 'inquiry']):
            priority = 'low'
        
        # Extract tags based on content
        tags = []
        if 'password' in body_lower or 'login' in body_lower:
            tags.append('authentication')
        if 'payment' in body_lower or 'billing' in body_lower:
            tags.append('billing')
        if 'bug' in body_lower or 'error' in body_lower:
            tags.append('technical')
        if 'feature' in body_lower or 'request' in body_lower:
            tags.append('feature-request')
        
        email_data = {
            'sender': row['sender'],
            'subject': row['subject'],
            'body': row['body'],
            'sent_date': sent_date.isoformat(),
            'replies': '',  # Empty initially
            'priority': priority,
            'sentiment': sentiment,
            'status': 'unread',
            'tags': tags
        }
        
        emails.append(email_data)
    
    print(f"[v0] Processed {len(emails)} emails from CSV")
    
    # Insert emails into Supabase
    if emails:
        try:
            result = supabase.table('emails').insert(emails).execute()
            print(f"[v0] Successfully inserted {len(emails)} emails into Supabase")
            print(f"[v0] Sample inserted email: {result.data[0] if result.data else 'No data returned'}")
        except Exception as e:
            print(f"[v0] Error inserting emails into Supabase: {e}")
    else:
        print("[v0] No emails to insert")
    
except Exception as e:
    print(f"[v0] Error processing CSV data: {e}")
