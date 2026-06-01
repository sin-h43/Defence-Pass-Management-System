//Resuable Status Badges
interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const getBadgeStyles = () => {
        switch (status.toLowerCase()){
            case 'checked in':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'pending clearance':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'checked out':
                return 'bg-gray-800 text-gray-400 border-transparent';
            case 'revoked':
                return 'bg-rose-500/10 text-rose-400 border-rose-500/20';

            //Security Clearance Levels
            case 'level 1':
                return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
            case 'level 2':
                return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
            case 'level 3':
                return 'bg-red-500/10 text-red-400 border-red-500/20';
                
            default:
                return 'bg-gray-800 text-gray-400 border-transparent';
        }
    };

    return (
        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getBadgeStyles()}`}>
            {status}
        </span>
    );
}