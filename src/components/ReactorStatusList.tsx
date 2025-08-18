import React from "react";

export interface DisplayReactor {
    id: string;
    status: "active" | "warning" | "error" | "inactive";
    startedAt: Date | null;
}

interface ReactorStatusListProps {
    reactors: DisplayReactor[];
}

// Status color and text mappings
const statusColor: Record<DisplayReactor["status"], string> = {
    active: "bg-[#26bfa6]",
    warning: "bg-yellow-400",
    error: "bg-red-500",
    inactive: "bg-gray-300"
};
const statusText: Record<DisplayReactor["status"], string> = {
    active: "Active",
    warning: "Warning",
    error: "Error",
    inactive: "Inactive"
};

// Format fermentation elapsed time
function formatElapsed(from: Date) {
    const totalSec = Math.floor((Date.now() - from.getTime()) / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor(totalSec / 3600) - days * 24;
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${days}d ${hours}h ${mins}m ${secs}s`;
}

export const ReactorStatusList: React.FC<ReactorStatusListProps> = ({
    reactors
}) => (
    <div className="bg-white border border-black rounded-lg shadow-md p-4 flex-1 flex flex-col min-h-[200px] max-h-[580px] overflow-y-auto">
        <div className="font-halvar-medium font-bold text-gray-700 mb-2">Reactor Status</div>
        <div className="flex row items-center justify-between mb-4">
            <p>Reactor ID</p>
            <p>Status</p>
            <p>Fermentation Time</p>
        </div>
        <ul className="space-y-2">
            {reactors.map(r => (
                <li key={r.id}
                    className="flex items-center justify-between px-2 py-1 rounded hover:bg-gray-100">
                    <span className="flex items-center gap-2">
                        {/* Status circle */}
                        <span className={`inline-block w-3 h-3 rounded-full ${statusColor[r.status]}`}></span>
                        <span className="font-halvar-regular text-sm">{r.id}</span>
                    </span>
                    
                        <span className={`font-halvar-regular text-sm font-medium ${statusColor[r.status].replace('bg-', 'text-')}`}>
                            {statusText[r.status]}
                        </span>
                        {/* Timer for active, warning, error */}
                        {["active", "warning", "error"].includes(r.status) && r.startedAt && (
                            <span className="ml-2 font-halvar-regular text-sm text-gray-500">{formatElapsed(r.startedAt)} ago</span>
                        )}
                    
                </li>
            ))}
        </ul>
    </div>
);
