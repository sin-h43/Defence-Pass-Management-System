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