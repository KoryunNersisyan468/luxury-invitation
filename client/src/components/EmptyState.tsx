import { Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui';

interface EmptyStateProps {
  title: string;
  message: string;
  actionText?: string;
  actionLink?: string;
}

export function EmptyState({ title, message, actionText, actionLink }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <Sparkles className="w-16 h-16 text-primary mb-6" />
      <h2 className="heading-section text-primary mb-3">{title}</h2>
      <p className="text-muted-foreground font-body max-w-md mb-8">{message}</p>
      {actionLink && actionText && (
        <Link to={actionLink}><Button>{actionText}</Button></Link>
      )}
    </div>
  );
}