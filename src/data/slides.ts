export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: SlideContent;
  speakerNotes: string;
  estimatedMinutes: number;
  category: 'intro' | 'development' | 'neonatal' | 'cardio' | 'respiratory' | 'gi' | 'infectious' | 'emergency' | 'review';
}

export interface ButterflyWingContent {
  title: string;
  content: string;
  icon?: string;
}

export type SlideContent =
  | { type: 'title'; mainTitle: string; subtitle: string; author: string; institution: string }
  | { type: 'objectives'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][]; notes?: string }
  | { type: 'algorithm'; title: string; steps: AlgorithmStep[]; pearl?: string }
  | { type: 'clinical-case'; scenario: string; questions: QuizQuestion[]; }
  | { type: 'two-column'; left: ContentBlock; right: ContentBlock }
  | { type: 'key-points'; points: KeyPoint[] }
  | { type: 'illustrated-butterfly'; centerTitle: string; theme: 'sunset' | 'spring' | 'ocean' | 'autumn'; leftWing: ButterflyWingContent; rightWing: ButterflyWingContent };

export interface AlgorithmStep {
  condition: string;
  action: string;
  branches?: { label: string; outcome: string }[];
}

export interface QuizQuestion {
  question: string;
  options: { label: string; text: string; correct: boolean }[];
  explanation: string;
}

export interface ContentBlock {
  title?: string;
  items: string[];
  highlight?: boolean;
}

export interface KeyPoint {
  title: string;
  description: string;
  alert?: 'red' | 'yellow' | 'green';
  icon: string;
}

export const slides: Slide[] = [
  // Slide 1: Welcome - Illustrated Butterfly
  {
    id: 1,
    title: 'Pediatric Clerkship High-Yield Review',
    category: 'intro',
    estimatedMinutes: 2,
    content: {
      type: 'illustrated-butterfly',
      centerTitle: 'Welcome to Pediatric Clerkship!',
      theme: 'autumn',
      leftWing: {
        title: '💡 What You\'ll Learn',
        content: 'Master developmental milestones, recognize red flags, manage common pediatric emergencies, and build confidence in caring for children.'
      },
      rightWing: {
        title: '🦋 Your Journey',
        content: 'Transform from medical student to confident clinician through hands-on experience, mentorship, and evidence-based practice.'
      }
    },
    speakerNotes: `Welcome! This beautiful butterfly slide sets the tone. The butterfly symbolizes transformation - from medical student to confident pediatric clinician. This 30-minute session covers the most critical concepts for your success.`
  },

  // Slide 2: Developmental Milestones (High-Yield)
  {
    id: 2,
    title: 'Developmental Milestones',
    subtitle: 'Most Frequently Tested',
    category: 'development',
    estimatedMinutes: 3,
    content: {
      type: 'table',
      headers: ['Age', 'Gross Motor', 'Fine Motor', 'Language/Social'],
      rows: [
        ['2 mo', 'Lifts head', 'Tracks past midline', 'Social smile'],
        ['6 mo', '**Sits unsupported**', 'Transfers objects', '**Stranger anxiety**'],
        ['9 mo', 'Crawls', '**Pincer grasp**', 'Waves bye-bye'],
        ['12 mo', '**Walks**', '2-finger pincer', '**Mama/dada (specific)**'],
        ['18 mo', 'Runs', 'Stacks 3-4 blocks', '**10-20 words**'],
        ['24 mo', 'Kicks ball', 'Vertical line', '**2-word phrases**']
      ],
      notes: '🎯 Memory Aid: 6=sits, 9=pincer, 12=walks, 24=2-word phrases'
    },
    speakerNotes: `Red flags: No social smile by 2 months, not sitting by 9 months, not walking by 18 months, no 2-word phrases by 24 months. ANY regression requires immediate evaluation.`
  },

  // Slide 3: Red Flags
  {
    id: 3,
    title: 'Developmental Red Flags',
    subtitle: 'Warning Signs Requiring Immediate Referral',
    category: 'development',
    estimatedMinutes: 2,
    content: {
      type: 'key-points',
      points: [
        {
          title: 'REGRESSION',
          description: 'Loss of any previously acquired skill at ANY age',
          alert: 'red',
          icon: '🚨'
        },
        {
          title: 'No babbling by 12 months',
          description: 'Hearing loss, autism spectrum, developmental delay',
          alert: 'yellow',
          icon: '⚠️'
        },
        {
          title: 'Hand dominance before 18 months',
          description: 'Suggests weakness of non-preferred hand (hemiparesis)',
          alert: 'yellow',
          icon: '✋'
        },
        {
          title: 'Not walking by 18 months',
          description: 'Gross motor delay, DDH, neuromuscular disorder',
          alert: 'yellow',
          icon: '🚶'
        }
      ]
    },
    speakerNotes: `Key principle: REGRESSION is always concerning and requires urgent evaluation for neurodegenerative conditions, autism, or other pathology.`
  },

  // Slide 4: Neonatal Jaundice Algorithm
  {
    id: 4,
    title: 'Neonatal Jaundice: The Critical Algorithm',
    category: 'neonatal',
    estimatedMinutes: 3,
    content: {
      type: 'algorithm',
      title: 'Jaundice Evaluation',
      steps: [
        {
          condition: 'Jaundice appears <24 hours of life?',
          action: 'PATHOLOGIC! Immediate workup',
          branches: [
            { label: 'YES', outcome: 'Blood type, Coombs, CBC, retic, bilirubin. Consider: ABO/Rh incompatibility, G6PD, spherocytosis' },
            { label: 'NO', outcome: 'Check timing and direct bilirubin' }
          ]
        },
        {
          condition: 'Direct (conjugated) bilirubin >2 mg/dL?',
          action: 'URGENT cholestasis workup',
          branches: [
            { label: 'YES', outcome: 'Biliary atresia, choledochal cyst, infections - time-sensitive!' },
            { label: 'NO', outcome: 'Likely physiologic or indirect hyperbili' }
          ]
        },
        {
          condition: 'Persists >2 weeks (term)?',
          action: 'Check direct bili to rule out biliary atresia'
        }
      ],
      pearl: 'Phototherapy prevents kernicterus. Exchange transfusion if total bili >25 mg/dL or acute bilirubin encephalopathy signs.'
    },
    speakerNotes: `Onset <24 hours = ALWAYS pathologic. Direct hyperbilirubinemia = ALWAYS pathologic. Biliary atresia is time-sensitive - Kasai procedure must be done before 60 days of life for best outcomes.`
  },

  // Slide 5: Neonatal Section Divider - Illustrated Butterfly
  {
    id: 5,
    title: 'Neonatal Emergencies',
    category: 'neonatal',
    estimatedMinutes: 1,
    content: {
      type: 'illustrated-butterfly',
      centerTitle: 'Neonatal Emergencies',
      theme: 'ocean',
      leftWing: {
        title: '🔥 Fever in Infants',
        content: 'Age matters! <28 days = full septic workup always. 28-90 days = risk stratify. Remember: Ampicillin for Listeria coverage.',
        icon: '🌡️'
      },
      rightWing: {
        title: '💛 Jaundice Timing',
        content: '<24 hours = pathologic. Direct hyperbili = cholestasis workup. Biliary atresia is time-sensitive - act fast!',
        icon: '⚠️'
      }
    },
    speakerNotes: `This beautiful transition slide highlights the two most critical neonatal emergencies: fever and jaundice. Both require immediate, age-appropriate action.`
  },

  // Slide 6: Fever in Infants
  {
    id: 6,
    title: 'Fever Workup: Age-Based Approach',
    category: 'neonatal',
    estimatedMinutes: 3,
    content: {
      type: 'algorithm',
      title: 'Fever ≥38°C (100.4°F) Rectal',
      steps: [
        {
          condition: 'Age <28 days?',
          action: 'FULL SEPSIS WORKUP + Admit',
          branches: [
            {
              label: 'YES',
              outcome: 'Blood culture, CBC, UA + culture, LP (CSF), CXR. Empiric: Ampicillin + Gentamicin ± Cefotaxime. Add acyclovir if HSV concern.'
            }
          ]
        },
        {
          condition: 'Age 28-90 days?',
          action: 'Risk stratify, low threshold for admission',
          branches: [
            { label: 'Well-appearing + low-risk criteria', outcome: 'Consider observation with close follow-up' },
            { label: 'Any high-risk features', outcome: 'Full workup + admit' }
          ]
        },
        {
          condition: 'Age >3 months?',
          action: 'Focused workup based on exam findings',
          branches: [
            { label: 'Source identified', outcome: 'Treat appropriately' },
            { label: 'No source but well-appearing', outcome: 'Consider urine culture, observe or empiric treatment' }
          ]
        }
      ],
      pearl: 'Ampicillin for neonates covers Listeria (3rd-gen cephalosporins do NOT). This is a classic board question.'
    },
    speakerNotes: `Key: Age <28 days = ALWAYS full workup including LP. GBS is #1 cause of early-onset sepsis. Remember: neonates cannot localize infections well. Dr. Sharma's Pearl: Classic exam question AND real management issue. Neonates need ampicillin because Listeria isn't covered by 3rd-gen cephalosporins. Missing this = catastrophic.`
  },

  // Slide 7: Congenital Heart Disease
  {
    id: 7,
    title: 'Congenital Heart Defects: The Big Picture',
    subtitle: 'Cyanotic vs Acyanotic',
    category: 'cardio',
    estimatedMinutes: 3,
    content: {
      type: 'two-column',
      left: {
        title: 'CYANOTIC (5 Ts)',
        items: [
          '**Tetralogy of Fallot** - Most common cyanotic CHD',
          '**Transposition of Great Arteries** - Needs PGE1!',
          '**Truncus Arteriosus** - Single vessel',
          '**Tricuspid Atresia** - Single ventricle physiology',
          '**TAPVR** - Total anomalous pulmonary venous return'
        ],
        highlight: true
      },
      right: {
        title: 'ACYANOTIC',
        items: [
          '**VSD** - Most common CHD overall (loud holosystolic)',
          '**ASD** - Fixed split S2',
          '**PDA** - Continuous machine-like murmur',
          '**Coarctation of Aorta** - BP discrepancy, delayed fem pulses',
          '**Aortic Stenosis** - Ejection click, crescendo-decrescendo'
        ]
      }
    },
    speakerNotes: `Cyanotic lesions often need PGE1 (prostaglandin) to keep PDA open as a "bridge" until surgery. TGA is the classic emergency needing balloon atrial septostomy. VSD is most common CHD overall.`
  },

  // Slide 8: Quiz - Cardiology
  {
    id: 8,
    title: 'Quick Case: Congenital Heart Disease',
    category: 'cardio',
    estimatedMinutes: 2,
    content: {
      type: 'clinical-case',
      scenario: '2-day-old infant with cyanosis, no murmur, CXR shows "egg on a string". Echo shows parallel great vessels.',
      questions: [
        {
          question: 'Most likely diagnosis?',
          options: [
            { label: 'A', text: 'Tetralogy of Fallot', correct: false },
            { label: 'B', text: 'Transposition of Great Arteries', correct: true },
            { label: 'C', text: 'Truncus Arteriosus', correct: false },
            { label: 'D', text: 'VSD', correct: false }
          ],
          explanation: 'TGA - parallel great vessels, "egg on string" CXR. Needs immediate PGE1 and balloon atrial septostomy. This is a neonatal emergency.'
        }
      ]
    },
    speakerNotes: `TGA is incompatible with life without mixing (PDA, ASD, or VSD). PGE1 keeps ductus open. Definitive treatment is arterial switch operation in first week of life.`
  },

  // Slide 9: Respiratory Section Divider - Illustrated Butterfly
  {
    id: 9,
    title: 'Respiratory Emergencies',
    category: 'respiratory',
    estimatedMinutes: 1,
    content: {
      type: 'illustrated-butterfly',
      centerTitle: 'Respiratory Distress in Children',
      theme: 'spring',
      leftWing: {
        title: '💨 Asthma Exacerbation',
        content: 'Albuterol + steroids first-line. Severe? Add ipratropium, IV magnesium. Status asthmaticus = ICU. Peak flow >70% to discharge.',
        icon: '🫁'
      },
      rightWing: {
        title: '🦠 Bronchiolitis',
        content: 'RSV most common. NO routine albuterol or steroids! Supportive care: O2, suctioning, hydration. Most improve in 5-7 days.',
        icon: '🤧'
      }
    },
    speakerNotes: `Respiratory distress is one of the most common pediatric emergencies. This slide contrasts the two main conditions: asthma (needs meds) vs bronchiolitis (supportive care only).`
  },

  // Slide 10: Asthma Exacerbation
  {
    id: 10,
    title: 'Asthma Exacerbation: Management',
    category: 'respiratory',
    estimatedMinutes: 3,
    content: {
      type: 'algorithm',
      title: 'Acute Asthma Management',
      steps: [
        {
          condition: 'Severity Assessment',
          action: 'Classify based on symptoms, peak flow, SpO2',
          branches: [
            { label: 'Mild-Moderate', outcome: 'Albuterol q20min × 3, oral steroids, reassess' },
            { label: 'Severe', outcome: 'Continuous albuterol, IV steroids, IV magnesium, admit ICU' }
          ]
        },
        {
          condition: 'First-Line Treatment',
          action: 'Albuterol 0.15 mg/kg (max 5mg) nebulized + Prednisone 1-2 mg/kg (max 60mg)'
        },
        {
          condition: 'Not responding?',
          action: 'Add ipratropium, IV magnesium sulfate (50 mg/kg over 20 min, max 2g), continuous albuterol',
          branches: [
            { label: 'Still not responding', outcome: 'ICU for possible intubation, IV methylprednisolone, consider epinephrine' }
          ]
        }
      ],
      pearl: 'Discharge criteria: Peak flow >70% predicted, SpO2 >90% on room air, no accessory muscle use, reliably taking PO.'
    },
    speakerNotes: `Status asthmaticus = life-threatening. Red flags for ICU: Cannot speak in full sentences, severe retractions, altered mental status (CO2 retention), SpO2 <90% despite oxygen.`
  },

  // Slide 11: Bronchiolitis
  {
    id: 11,
    title: 'Bronchiolitis: What NOT to Do',
    subtitle: '2024-2025 Guidelines',
    category: 'respiratory',
    estimatedMinutes: 2,
    content: {
      type: 'key-points',
      points: [
        {
          title: 'NO routine albuterol or steroids',
          description: 'Evidence does not support routine use in bronchiolitis',
          alert: 'red',
          icon: '🚫'
        },
        {
          title: 'Supportive care is key',
          description: 'Oxygen if SpO2 <90%, nasal suctioning, hydration',
          alert: 'green',
          icon: '✅'
        },
        {
          title: 'Admit if: Age <6 weeks, severe distress, apnea, comorbidities',
          description: 'RSV is most common cause; peaks 6-12 months',
          icon: '🏥'
        },
        {
          title: 'Antibiotics only if bacterial superinfection',
          description: 'Fever recurrence, focal findings on exam/CXR',
          icon: '💊'
        }
      ]
    },
    speakerNotes: `Common mistake: reflexively giving albuterol for wheezing in infants <2 years. Bronchiolitis is viral - supportive care is mainstay. Most recover in 5-7 days.`
  },

  // Slide 12: GI Section Divider - Illustrated Butterfly
  {
    id: 12,
    title: 'Gastrointestinal Emergencies',
    category: 'gi',
    estimatedMinutes: 1,
    content: {
      type: 'illustrated-butterfly',
      centerTitle: 'GI Emergencies: Act Fast!',
      theme: 'autumn',
      leftWing: {
        title: '💚 Bilious Vomiting',
        content: 'Yellow-green vomit = malrotation/volvulus until proven otherwise! NPO, NGT, IV fluids, STAT upper GI series, surgical consult NOW.',
        icon: '🚨'
      },
      rightWing: {
        title: '🍼 Non-Bilious Vomiting',
        content: '2-8 weeks old with projectile vomiting? Think pyloric stenosis. Palpable olive + metabolic alkalosis. Fix lytes BEFORE surgery!',
        icon: '🤮'
      }
    },
    speakerNotes: `The color of vomit is CRITICAL in pediatrics. Bilious = surgical emergency. Non-bilious in young infants = think pyloric stenosis. This distinction saves lives!`
  },

  // Slide 13: Bilious Vomiting - Surgical Emergency
  {
    id: 13,
    title: 'Bilious Vomiting = Surgical Emergency',
    category: 'gi',
    estimatedMinutes: 2,
    content: {
      type: 'algorithm',
      title: 'The Critical Fork',
      steps: [
        {
          condition: 'Is vomit BILIOUS (yellow-green)?',
          action: 'Assume malrotation/volvulus until proven otherwise',
          branches: [
            {
              label: 'YES',
              outcome: `🚨 NPO, NGT, IV fluids (20 mL/kg bolus), STAT upper GI series (NOT CT), STAT surgical consult. Time = bowel viability.`
            },
            {
              label: 'NO (non-bilious)',
              outcome: 'Age-based differential: 2-8 weeks = pyloric stenosis, older = gastroenteritis, appendicitis'
            }
          ]
        }
      ],
      pearl: 'Malrotation with volvulus can lead to total midgut necrosis. >6 hours from symptoms to surgery = increased necrosis risk. This is a true emergency.'
    },
    speakerNotes: `Bilious vomiting = surgical emergency until proven otherwise. Malrotation typically presents in first month of life but can occur at any age. Upper GI series is diagnostic - shows abnormal duodenal position.`
  },

  // Slide 14: Pyloric Stenosis
  {
    id: 14,
    title: 'Pyloric Stenosis: Classic Presentation',
    category: 'gi',
    estimatedMinutes: 2,
    content: {
      type: 'two-column',
      left: {
        title: 'Clinical Features',
        items: [
          '**Age:** 2-8 weeks (peak 3-5 weeks)',
          '**Vomiting:** Non-bilious, projectile, after feeds',
          '**Exam:** Visible peristaltic wave, palpable "olive"',
          '**Baby:** Hungry immediately after vomiting',
          '**Labs:** Hypochloremic metabolic alkalosis'
        ]
      },
      right: {
        title: 'Management',
        items: [
          '**Diagnosis:** Abdominal ultrasound (pyloric muscle >3mm)',
          '**CRITICAL:** Correct electrolytes BEFORE surgery!',
          '**Why:** Hypokalemia → post-op apnea risk',
          '**Treatment:** Pyloromyotomy (definitive)',
          '**Prognosis:** Excellent after surgery'
        ],
        highlight: true
      }
    },
    speakerNotes: `Classic mistake: Rushing to OR without correcting electrolytes. Infant has been vomiting HCl → hypochloremic metabolic alkalosis. Must give IV fluids + potassium repletion before surgery. Dr. Sharma: 'Pyloric stenosis - I see students rush to OR. STOP. Check K+ after hydration. Rushing with profound hypokalemia = complications.'`
  },

  // Slide 15: Intussusception
  {
    id: 15,
    title: 'Intussusception: The Classic Triad',
    category: 'gi',
    estimatedMinutes: 2,
    content: {
      type: 'key-points',
      points: [
        {
          title: 'Colicky abdominal pain (intermittent)',
          description: 'Child draws knees to chest, screams, then calm between episodes',
          icon: '😫'
        },
        {
          title: 'Vomiting',
          description: 'May be bilious if prolonged obstruction',
          icon: '🤮'
        },
        {
          title: '"Currant jelly" stools',
          description: 'Blood + mucus (late finding - indicates ischemia)',
          alert: 'red',
          icon: '🩸'
        },
        {
          title: 'Diagnosis: Abdominal ultrasound ("target sign")',
          description: 'Treatment: Air or hydrostatic enema (non-operative if no perforation)',
          alert: 'green',
          icon: '🎯'
        }
      ]
    },
    speakerNotes: `Peak age 6-36 months. Lead point in older kids (lymphoma, Meckel diverticulum, polyp). Most idiopathic in infants (hypertrophied Peyer patches post-viral infection). Enema is both diagnostic and therapeutic. Dr. Sharma: 'Intussusception: Classic "currant jelly" stools. 10-month-old with colicky pain → get ultrasound immediately. Don't delay if classic presentation.'`
  },

  // Slide 16: Meningitis - Don't Miss This
  {
    id: 16,
    title: 'Bacterial Meningitis: High-Stakes Diagnosis',
    category: 'infectious',
    estimatedMinutes: 3,
    content: {
      type: 'algorithm',
      title: 'Meningitis Workup & Treatment',
      steps: [
        {
          condition: 'Suspect meningitis (fever + headache + neck stiffness)?',
          action: 'Lumbar puncture is GOLD STANDARD',
          branches: [
            { label: 'Can do LP now', outcome: 'Do LP, then antibiotics within 1 hour' },
            { label: 'LP delayed (e.g., imaging needed)', outcome: `🚨 Give antibiotics FIRST - don't delay for LP!` }
          ]
        },
        {
          condition: 'Empiric Antibiotics (Before Culture)',
          action: 'Age-based coverage',
          branches: [
            { label: '<3 months', outcome: 'Ampicillin + Gent + Ceftazidime (Listeria coverage)' },
            { label: '3 mo - 18 yrs', outcome: 'Ceftriaxone + Vancomycin (pneumococcal + meningococcal)' }
          ]
        },
        {
          condition: 'Add dexamethasone?',
          action: 'Give 0.15 mg/kg IV with or before first antibiotic dose (reduces mortality/morbidity)'
        }
      ],
      pearl: 'Petechial rash + fever = meningococcemia until proven otherwise. This is a medical emergency - antibiotics immediately.'
    },
    speakerNotes: `Key principle: If you suspect meningitis and LP will be delayed, give antibiotics FIRST. Mortality without treatment is ~100%. With treatment, still 10-15%. Complications: hearing loss, developmental delay.`
  },

  // Slide 17: Vaccines - High-Yield Schedule
  {
    id: 17,
    title: 'Vaccination Schedule: Key Milestones',
    category: 'infectious',
    estimatedMinutes: 2,
    content: {
      type: 'table',
      headers: ['Age', 'Vaccines', 'Key Points'],
      rows: [
        ['Birth', 'Hep B (1st dose)', 'Within 24 hours, especially if mother HBsAg+'],
        ['2, 4, 6 mo', 'DTaP, IPV, Hib, PCV, Rotavirus', 'Rotavirus oral - do NOT give after 8 months'],
        ['12-15 mo', 'MMR (1st), Varicella (1st), Hep A (1st)', 'MMR contraindicated if immunocompromised'],
        ['4-6 yrs', 'DTaP, IPV, MMR (2nd), Varicella (2nd)', 'School entry requirements'],
        ['11-12 yrs', 'Tdap, MCV4, HPV', 'HPV: 2-dose series if <15 yrs, 3-dose if ≥15 yrs'],
        ['16 yrs', 'MCV4 (booster)', 'Meningococcal booster before college']
      ],
      notes: '🚨 Live vaccines (MMR, Varicella, Rotavirus) contraindicated in immunocompromised patients'
    },
    speakerNotes: `Common board questions: MMR contraindications (pregnancy, immunocompromised), when to catch up vaccines, post-exposure prophylaxis timing. Rotavirus must be started by 14 weeks, finished by 8 months.`
  },

  // Slide 18: DKA in Children
  {
    id: 18,
    title: 'Diabetic Ketoacidosis: Pediatric Pearls',
    category: 'emergency',
    estimatedMinutes: 3,
    content: {
      type: 'algorithm',
      title: 'DKA Management',
      steps: [
        {
          condition: 'Diagnosis: Glucose >250, pH <7.3, ketones positive',
          action: 'Assess severity and initiate treatment'
        },
        {
          condition: 'Fluid Resuscitation',
          action: '20 mL/kg NS bolus (may repeat × 1-2 if shock), then maintenance + deficit over 48 hours',
          branches: [
            { label: 'CRITICAL', outcome: '🚨 Avoid rapid correction - risk of cerebral edema! Go slow.' }
          ]
        },
        {
          condition: 'Insulin',
          action: 'Start 0.1 units/kg/hr AFTER initial fluid bolus. Do NOT bolus insulin in children.',
          branches: [
            { label: 'When to add dextrose?', outcome: 'When glucose <250, continue insulin + add D5 to fluids' }
          ]
        },
        {
          condition: '🚨 Cerebral Edema Warning Signs',
          action: 'Headache, altered mental status, bradycardia, hypertension → Give mannitol, head CT, ICU',
          branches: [
            { label: 'Prevention', outcome: 'Slow fluid resuscitation, avoid rapid glucose drop' }
          ]
        }
      ],
      pearl: 'Cerebral edema is the leading cause of death in pediatric DKA. Occurs 6-12 hours into treatment. Risk factors: severe DKA, rapid correction, young age.'
    },
    speakerNotes: `Key differences from adult DKA: Higher cerebral edema risk, slower fluid replacement, no insulin bolus. Monitor neuro status closely. Bicarb generally NOT recommended.`
  },

  // Slide 19: Status Epilepticus
  {
    id: 19,
    title: 'Status Epilepticus: Time is Brain',
    category: 'emergency',
    estimatedMinutes: 2,
    content: {
      type: 'algorithm',
      title: 'Seizure Management Protocol',
      steps: [
        {
          condition: 'Definition: Seizure >5 minutes OR repeated without regaining consciousness',
          action: 'This is a neurological emergency'
        },
        {
          condition: '0-5 minutes: Supportive Care',
          action: 'Position on side, ensure airway, give oxygen, IV access, check glucose'
        },
        {
          condition: '5-20 minutes: Benzodiazepines',
          action: 'Lorazepam 0.1 mg/kg IV (or midazolam IM/IN if no IV access)',
          branches: [
            { label: 'May repeat × 1', outcome: 'If still seizing after 2nd dose, escalate' }
          ]
        },
        {
          condition: '20-40 minutes: Second-line AED',
          action: 'Fosphenytoin OR Levetiracetam (Keppra) OR Valproate',
          branches: [
            { label: 'Still seizing', outcome: 'Refractory status - needs ICU, intubation, continuous EEG' }
          ]
        }
      ],
      pearl: 'First-line is benzodiazepine. Levetiracetam is gaining favor as second-line (fewer side effects than phenytoin).'
    },
    speakerNotes: `Status epilepticus has ~20% mortality if prolonged. Key is aggressive early treatment. Always check glucose - hypoglycemia is easily treatable cause. Febrile seizure management is different - typically self-limited.`
  },

  // Slide 20: Child Abuse Recognition
  {
    id: 20,
    title: 'Child Abuse: Recognition & Reporting',
    category: 'emergency',
    estimatedMinutes: 3,
    content: {
      type: 'key-points',
      points: [
        {
          title: 'TEN-4 Rule (Bruising)',
          description: 'Bruises on: Torso, Ear, Neck in child <4 months OR anywhere in child <4 months = concerning',
          alert: 'red',
          icon: '🩹'
        },
        {
          title: 'Fractures: High specificity for abuse',
          description: 'Metaphyseal corner fractures, posterior rib fractures, multiple fractures at different stages',
          alert: 'red',
          icon: '🦴'
        },
        {
          title: 'Shaken Baby Syndrome',
          description: 'Retinal hemorrhages + subdural hematoma + no external trauma. Can present with lethargy, vomiting, seizures.',
          alert: 'red',
          icon: '👶'
        },
        {
          title: 'Mandatory Reporting',
          description: 'Healthcare providers MUST report suspected abuse. You don\'t need proof - just reasonable suspicion.',
          alert: 'yellow',
          icon: '📞'
        }
      ]
    },
    speakerNotes: `High-yield for boards and real life. Classic case: infant with "fussiness" and retinal hemorrhages. Always consider abuse in: unexplained injuries, history inconsistent with injury, delay in seeking care. Document objectively, report to CPS.`
  },

  // NEW Slide 18: Pyloric Stenosis vs Intussusception Comparison
  {
    id: 18,
    title: 'GI Surgical Emergencies: Side-by-Side',
    subtitle: 'Pyloric Stenosis vs Intussusception',
    category: 'gi',
    estimatedMinutes: 3,
    content: {
      type: 'two-column',
      left: {
        title: 'Pyloric Stenosis',
        items: [
          '**Age:** 2-8 weeks (peak 3-5 weeks)',
          '**Classic:** Non-bilious projectile vomit, hungry immediately after',
          '**Exam:** Visible peristaltic wave, palpable "olive" (RUQ)',
          '**Labs:** Hypochloremic metabolic alkalosis (vomiting HCl)',
          '**Diagnosis:** Abdominal ultrasound (pyloric muscle >3mm)',
          '**⚠️ CRITICAL:** Correct electrolytes BEFORE surgery!',
          '**Treatment:** Pyloromyotomy'
        ],
        highlight: true
      },
      right: {
        title: 'Intussusception',
        items: [
          '**Age:** 6-36 months (peak)',
          '**Classic:** Colicky pain + vomit + "currant jelly" stools',
          '**Exam:** RUQ "sausage-shaped" mass (30% palpable)',
          '**Imaging:** Ultrasound (gold standard: "target sign")',
          '**Treatment:** Air or hydrostatic enema reduction (non-operative)',
          '**Pearl:** Don\'t delay if classic presentation',
          '**Surgical:** Only if perforation signs'
        ],
        highlight: true
      }
    },
    speakerNotes: `Two surgical GI emergencies you MUST recognize. Pyloric = electrolytes first. Intussusception = ultrasound urgently, enema is treatment. Both are high-yield for boards and clinical practice.`
  },

  // NEW Slide 19: Celiac Disease Diagnostic Algorithm
  {
    id: 19,
    title: 'Celiac Disease: 2024 Diagnostic Update',
    subtitle: 'Streamlined Diagnosis Algorithm',
    category: 'gi',
    estimatedMinutes: 3,
    content: {
      type: 'algorithm',
      title: 'Celiac Disease Workup',
      steps: [
        {
          condition: 'STEP 1: Serology (ON REGULAR DIET with gluten)',
          action: 'Order tTG-IgA, Total IgA, and EMA-IgA',
          branches: [
            { label: 'tTG-IgA', outcome: 'Tissue transglutaminase IgA (MOST SENSITIVE)' },
            { label: 'Total IgA', outcome: 'Rule out IgA deficiency' },
            { label: 'EMA-IgA', outcome: 'Endomysial antibody for confirmation' }
          ]
        },
        {
          condition: 'STEP 2: Interpretation',
          action: 'Determine if biopsy needed',
          branches: [
            { label: 'tTG-IgA ≥10x ULN + EMA positive', outcome: '✅ DIAGNOSIS MADE (no biopsy needed) [2024 UPDATE]' },
            { label: 'Intermediate values OR IgA deficiency', outcome: 'Need endoscopy with duodenal biopsy' },
            { label: 'Biopsy shows villous atrophy (Marsh grade 3)', outcome: 'Confirms diagnosis' }
          ]
        },
        {
          condition: 'STEP 3: Management',
          action: 'Lifelong gluten-free diet + monitoring',
          branches: [
            { label: 'Treatment', outcome: 'STRICT gluten-free diet (ONLY effective treatment)' },
            { label: 'Screening', outcome: 'Check for deficiencies: Iron, B12, folate, vitamins, calcium' },
            { label: 'Dietitian', outcome: 'Referral ESSENTIAL for family education' },
            { label: 'Follow-up', outcome: 'Repeat serology 1-2 years (should normalize)' }
          ]
        }
      ],
      pearl: '2024-2025 update: Can diagnose WITHOUT biopsy if tTG >10x upper limit + EMA positive. Saves endoscopy in clear cases.'
    },
    speakerNotes: `New guidelines streamline diagnosis. If serology strongly positive (>10x), no biopsy needed. But strict gluten-free diet is the ONLY treatment. Dietitian essential for family education. Classic presentation: chronic diarrhea, failure to thrive, abdominal distention.`
  },

  // NEW Slide 20: SVT & Status Epilepticus
  {
    id: 20,
    title: 'Pediatric Emergencies: SVT & Status Epilepticus',
    subtitle: 'Critical Management Protocols',
    category: 'emergency',
    estimatedMinutes: 3,
    content: {
      type: 'two-column',
      left: {
        title: 'SVT (Supraventricular Tachycardia)',
        items: [
          '**Most common pediatric arrhythmia**',
          '**Presentation:**',
          '• Infants: Irritability, poor feeding, shock if prolonged',
          '• Kids: Palpitations, dizziness, chest pain',
          '**ECG:** Regular narrow-complex tachycardia, no visible P waves',
          '**Acute Management:**',
          '1. Vagal maneuvers (Valsalva, ice water for infants)',
          '2. Adenosine IV: 0.1 mg/kg rapid push → 0.2 mg/kg if fails',
          '3. Synchronized cardioversion if unstable'
        ],
        highlight: true
      },
      right: {
        title: 'Status Epilepticus',
        items: [
          '**Definition:** Seizure >5 min OR repeated without baseline return',
          '**EMERGENCY - High mortality if prolonged**',
          '**Immediate Actions:**',
          '1. Position on side (prevent aspiration)',
          '2. Airway, oxygen',
          '3. Check glucose STAT (easy to treat)',
          '4. IV access + labs',
          '5. First-line: Lorazepam 0.1 mg/kg IV',
          '6. Second-line: Fosphenytoin or levetiracetam',
          '7. PICU if refractory'
        ],
        highlight: true
      }
    },
    speakerNotes: `Two life-threatening pediatric emergencies requiring immediate action. SVT: Adenosine is diagnostic AND therapeutic - causes transient AV block. Status epilepticus: Don't wait. If seizing >5 min, give benzodiazepine. Prolonged seizures = brain injury risk. Always check glucose - hypoglycemia is easily treatable cause.`
  },

  // Slide 21: Key Takeaways - Illustrated Butterfly
  {
    id: 21,
    title: 'Key Takeaways',
    subtitle: 'High-Yield Pearls for Success',
    category: 'review',
    estimatedMinutes: 2,
    content: {
      type: 'illustrated-butterfly',
      centerTitle: 'Remember These Clinical Pearls!',
      theme: 'sunset',
      leftWing: {
        title: '🚨 Never Miss',
        content: 'Bilious vomiting = surgical emergency. Petechiae + fever = meningococcemia. Limp + fever = septic hip. Age matters for fever workup.',
        icon: '⚠️'
      },
      rightWing: {
        title: '💎 Clinical Wisdom',
        content: 'Trust parental instinct. Babies can\'t fake sick. When in doubt, observe longer. Treat the child, not the number. Master the algorithms.',
        icon: '🧠'
      }
    },
    speakerNotes: `Congratulations! You now have the high-yield framework for pediatric clerkship success. These pearls will serve you throughout your career. The butterfly represents your transformation - you are now ready to fly! Questions?`
  }
];
