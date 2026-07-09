import { TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui';

interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ title, message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <TriangleAlert className="w-16 h-16 text-red-500 mb-6" />
      <h2 className="heading-section text-red-500 mb-3">{title}</h2>
      <p className="text-muted-foreground font-body max-w-md mb-8">{message}</p>
      {onRetry && (
        <Button onClick={onRetry}>Փորձել կրկին</Button>
      )}
    </div>
  );
}