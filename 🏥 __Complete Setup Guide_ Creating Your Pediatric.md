<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# 🏥 **Complete Setup Guide: Creating Your Pediatric Medical Education Space**

## 🚀 **Step-by-Step Space Creation Process**

### **Phase 1: Initial Space Setup**

1. **Navigate to Perplexity Spaces**
    - Go to [perplexity.ai](https://perplexity.ai)
    - Click "Spaces" in the left sidebar
    - Select "Create Space" (+ button)
2. **Basic Space Configuration**

```
Space Name: "Shiksha MedED Space" 
Description: "🏥 PedsEd AI: Evidence-Based Pediatric Education Hub"
Visibility: Private (recommended for medical content)
```

3. **Core Instructions Upload**
    - Copy the complete PedsEd AI instructions from the original query
    - Paste into the "Instructions" field
    - Ensure all //COMMANDS are properly formatted

***

## 📚 **Essential Knowledge Base Setup**

### **Phase 2: Upload Core Medical Resources**

#### **A. AAP Guidelines Collection** ⭐ **PRIORITY 1**

Upload these documents to your Space library:

1. **2024 AAP Clinical Practice Guidelines**
    - Download from: [AAP Policy Portal](https://www.aap.org/en-us/professional-resources/policy/)
    - Key files: Hyperbilirubinemia, ADHD, Febrile UTI guidelines
2. **Bright Futures 4th Edition**
    - Source: [AAP Bright Futures](https://www.aap.org/en/practice-management/bright-futures/)
    - Upload: Complete guidelines PDF + pocket guide
3. **AAP Red Book 2024**
    - Infectious disease protocols
    - Immunization schedules
    - Antimicrobial recommendations

#### **B. Board Preparation Materials**

```
Upload Priority Order:
1. ABP Content Outline (most recent)
2. PREP Questions (last 3 years)
3. Pediatrics in Review key articles
4. Board review question banks
5. Case-based learning modules
```


#### **C. Visual Learning Resources**

- Pediatric dermatology image atlas
- Developmental milestone charts
- Growth chart collections
- Procedure demonstration videos (links/descriptions)

***

## ⚙️ **Advanced Configuration Settings**

### **Phase 3: Customize AI Behavior**

#### **Enhanced Instructions Template**

Add this to your existing PedsEd instructions:

```markdown
## ADDITIONAL SPACE-SPECIFIC SETTINGS

### Content Sourcing Priority:
1. Uploaded AAP guidelines (always cite specific page/section)
2. Space library materials before web search
3. Current medical literature (2022+ preferred)
4. Cochrane reviews for evidence hierarchy

### Response Formatting Requirements:
- Always include evidence level (A/B/C) for recommendations
- Cite specific AAP policy statements by number
- Include "Last Updated" dates for clinical content
- Flag off-label medication uses clearly

### Safety Protocols:
- Never provide dosing without weight-based calculations
- Always include contraindications/warnings
- Flag emergent conditions requiring immediate intervention
- Include differential diagnosis considerations

### Learning Analytics:
- Track which //COMMANDS are used most frequently
- Note common knowledge gaps in questions
- Suggest follow-up learning modules based on query patterns
```


### **Custom Variables Setup**

Create these reusable elements in your Space:

```markdown
LEARNER_LEVELS = {
  "MS3": "Medical student, 3rd year - basic concepts, single-system focus",
  "MS4": "Medical student, 4th year - integration, clinical reasoning",
  "PGY1": "Intern - supervised decision-making, common presentations",
  "PGY2": "Second-year resident - independent management, complex cases",
  "PGY3": "Senior resident - teaching, leadership, subspecialty knowledge",
  "Fellow": "Subspecialty training - advanced/rare conditions"
}

EVIDENCE_LEVELS = {
  "A": "High-quality evidence, strong recommendation",
  "B": "Moderate evidence, moderate recommendation", 
  "C": "Limited evidence, weak recommendation",
  "Expert": "Expert opinion/consensus only"
}
```


***

## 🔧 **Integration \& Workflow Setup**

### **Phase 4: Connect External Resources**

#### **Bookmark Integration**

Add these essential links to your Space description:

```markdown
## 🔗 Quick Access Links
- [AAP Policy Portal](https://www.aap.org/en-us/professional-resources/policy/)
- [ABP Exam Information](https://www.abp.org/content/general-pediatrics-certification)
- [Pediatrics Journal](https://publications.aap.org/pediatrics)
- [PedsCCM Guidelines](https://www.pedsccm.org/Guidelines)
- [CDC Growth Charts](https://www.cdc.gov/growthcharts/)
- [Immunization Schedules](https://www.cdc.gov/vaccines/schedules/)
```


#### **Calendar Integration Setup**

Create recurring prompts for content updates:

```markdown
## 📅 Content Refresh Schedule
- Monthly: New AAP policy statements review
- Quarterly: Board exam statistics update
- Biannually: Curriculum effectiveness assessment
- Annually: Complete guideline review cycle
```


***

## 🎯 **Testing \& Optimization Phase**

### **Phase 5: Validate Space Performance**

#### **Test Command Functionality**

Run these validation checks:

```markdown
Test Sequence:
1. //CREATE Kawasaki Disease for PGY1 as interactive case
2. //ASSESS Neonatal Jaundice for MS3 (expect 5 MCQs)
3. //SIMULATE counseling about vaccine hesitancy
4. //DEEPDIVE immunology of febrile seizures

Expected Outputs:
✅ Structured learning modules with all 6 required elements
✅ Board-style questions with detailed explanations
✅ Interactive scenarios with branching logic
✅ Evidence-based deep dives with current citations
```


#### **Performance Optimization**

```markdown
If responses are too general:
→ Add more specific clinical scenarios to library
→ Include more detailed AAP policy excerpts
→ Upload subspecialty-specific guidelines

If responses lack visual elements:
→ Add image descriptions to library
→ Include links to pediatric atlases
→ Reference specific figures/tables in guidelines
```


***

## 📱 **Mobile \& Accessibility Setup**

### **Phase 6: Multi-Platform Optimization**

#### **Mobile-First Configuration**

```markdown
Optimize for:
- Quick //COMMAND access on mobile
- Concise but complete responses
- Offline-friendly content summaries
- Voice-to-text command compatibility
```


#### **Accessibility Features**

- Enable screen reader compatibility
- Include alt-text descriptions for medical images
- Provide text alternatives for visual learning elements
- Ensure color contrast meets medical education standards

***

## 🔒 **Privacy \& Compliance Setup**

### **Phase 7: Medical Education Compliance**

#### **FERPA/Privacy Settings**

```markdown
Content Guidelines:
- No real patient identifiers in examples
- Use fictional case scenarios only  
- Anonymize any clinical vignettes
- Include appropriate disclaimers for educational use
```


#### **Medical Accuracy Disclaimers**

Add this to your Space footer:

```markdown
⚠️ **Medical Education Disclaimer**
This Space provides educational content for healthcare professionals in training. 
All clinical recommendations should be verified against current guidelines and 
institutional protocols. Not intended for direct patient care decisions.
```


***

## 🎓 **Advanced Features Setup**

### **Phase 8: Enhanced Learning Tools**

#### **Spaced Repetition Integration**

```markdown
Create follow-up prompts:
- "Review yesterday's //CREATE content with practice questions"
- "Generate related scenarios based on previous //SIMULATE sessions"
- "Expand on concepts from last //DEEPDIVE session"
```


#### **Progress Tracking Template**

```markdown
## Learning Analytics Template
Date: {current_date}
Command Used: {//CREATE, //ASSESS, //SIMULATE, //DEEPDIVE}
Topic: {medical_topic}
Learner Level: {MS3-Fellow}
Completion Time: {estimated_minutes}
Follow-up Needed: {yes/no + specifics}
```


***

## ✅ **Final Checklist Before Launch**

### **Pre-Launch Validation**

- [ ] All //COMMANDS respond correctly with required elements
- [ ] AAP guidelines properly integrated and citeable
- [ ] Mobile responsiveness tested
- [ ] Evidence levels consistently included
- [ ] Safety warnings appropriately flagged
- [ ] Visual learning elements described/linked
- [ ] Board exam alignment verified
- [ ] Privacy/compliance requirements met


### **Success Metrics to Monitor**

- Response accuracy for clinical content
- User engagement with different //COMMAND types
- Time-to-completion for learning modules
- Knowledge retention (if assessable)
- User satisfaction with interactive elements

***

## 🚀 **Go-Live Strategy**

1. **Start with one medical topic** you know well for initial testing
2. **Test all four //COMMANDS** with that topic
3. **Refine instructions** based on response quality
4. **Gradually expand** topic coverage
5. **Monitor and optimize** based on usage patterns

This comprehensive setup will create a robust, evidence-based pediatric medical education platform that leverages Perplexity's AI capabilities while maintaining the highest standards of medical accuracy and educational effectiveness! 🌟

