'use client';

interface NotesPanelProps {
  notes: string;
  estimatedMinutes: number;
  onClose: () => void;
}

export default function NotesPanel({ notes, estimatedMinutes, onClose }: NotesPanelProps) {
  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-2xl border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto z-50 animate-slide-in no-print">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl hover:text-inova-blue transition-colors"
      >
        ×
      </button>

      <h3 className="text-xl font-bold text-inova-blue mb-4 flex items-center gap-2">
        <span>📝</span>
        <span>Speaker Notes</span>
      </h3>

      <div className="mb-4 p-3 bg-inova-butterfly-wing/10 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          ⏱️ Estimated time: <strong>{estimatedMinutes} minutes</strong>
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{notes}</p>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-200">
          💡 <strong>Teaching Tip:</strong> Pause frequently for questions. Encourage students to share their clinical experiences.
        </p>
      </div>
    </div>
  );
}
