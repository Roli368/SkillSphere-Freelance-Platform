from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
import os

app = Flask(__name__)

# Load a pre-trained HuggingFace model for semantic similarity
model = SentenceTransformer('all-MiniLM-L6-v2')

@app.route('/api/match', methods=['POST'])
def match_skills():
    data = request.json
    gig_skills = data.get('gig_skills', []) # e.g. ["React Developer", "Node.js"]
    freelancers = data.get('freelancers', []) # e.g. [{"id": "1", "skills": ["React", "Express"]}, ...]
    
    if not gig_skills or not freelancers:
        return jsonify({"error": "Missing gig_skills or freelancers"}), 400
        
    gig_text = " ".join(gig_skills)
    gig_embedding = model.encode(gig_text, convert_to_tensor=True)
    
    results = []
    for f in freelancers:
        f_skills = f.get('skills', [])
        f_text = " ".join(f_skills)
        f_embedding = model.encode(f_text, convert_to_tensor=True)
        
        # Calculate cosine similarity
        cosine_scores = util.cos_sim(gig_embedding, f_embedding)
        score = cosine_scores.item()
        
        results.append({
            "freelancerId": f.get('id'),
            "similarityScore": score
        })
        
    # Sort by similarity score descending
    results = sorted(results, key=lambda x: x['similarityScore'], reverse=True)
    
    return jsonify({"matches": results})

@app.route('/api/trending-skills', methods=['GET'])
def trending_skills():
    # Placeholder for trending skills detection logic
    # This would typically analyze recent gig postings
    return jsonify({
        "trending": [
            "React.js",
            "Node.js",
            "Machine Learning",
            "Python",
            "UI/UX Design"
        ]
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
