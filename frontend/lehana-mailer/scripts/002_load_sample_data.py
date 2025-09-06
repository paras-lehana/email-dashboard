import csv
import requests
from datetime import datetime
import json
import os

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
    print(f"[v0] Sample email: {emails[0] if emails else 'No emails found'}")
    
    # Save processed data to a JSON file for database insertion
    with open('processed_emails.json', 'w') as f:
        json.dump(emails, f, indent=2)
    
    print("[v0] Saved processed emails to processed_emails.json")
    print("[v0] Next step: Use this data to insert into Supabase database")
    
except Exception as e:
    print(f"[v0] Error processing CSV data: {e}")
