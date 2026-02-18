def categorize_task(title, description):
    """
    Simulates AI categorization based on keywords.
    """
    text = (title + " " + (description or "")).lower()
    
    if "study" in text:
        return "Study"
    elif "buy" in text:
        return "Personal"
    elif "build" in text:
        return "Work"
    else:
        return "General"
