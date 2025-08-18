import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LinePlotMock from "./LinePlotMock";
import { StepProgressBar } from "./StepProgressBar";
import SVGGauge from "./SVGGaugeMock";
import React from "react";

interface StatCardProps {
    title: string;
    temp: number;
    rpm: number;
    psi: number;
    phData: number[];
    doData: number[];
    currentStage: number;
    onEdit: (newRpm: number, newPsi: number) => void;
    height?: number;
    className?: string;
    reactorId?: string;  // <-- needed for navigation
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    temp,
    rpm,
    psi,
    phData,
    doData,
    currentStage,
    onEdit,
    reactorId, // <-- pass the reactor id, e.g. "CAN-123-12"
    height = 240,
    className = "",
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editRpm, setEditRpm] = useState(rpm);
    const [editPsi, setEditPsi] = useState(psi);
    const navigate = useNavigate();

    // Sync inputs if parent changes values externally
    React.useEffect(() => {
      setEditRpm(rpm);
      setEditPsi(psi);
    }, [rpm, psi]);

    // Overlay handlers
    const handleEditControls = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click
        setDialogOpen(true);
    };
    const handleViewReactor = (e: React.MouseEvent) => {
        e.stopPropagation();
        // If you have a canonical detail page like /reactor/CAN-123-12...
        if (reactorId) navigate(`/reactor/${reactorId}`);
    };

    const handleDialogSave = () => {
        setDialogOpen(false);
        onEdit(editRpm, editPsi);
    };

    return (
        <>
            {/* Root button/card (relative for overlay anchoring) */}
            <button
                type="button"
                className={`group relative w-full text-left focus:outline-none cursor-pointer ${className}`}
                style={{ minHeight: height + 64 }}
                tabIndex={0}
            >
                {/* Overlay with two buttons (only on hover/focus), pointer-events-auto for buttons */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="opacity-0 min-w-[280px] group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-150
                                    bg-black/60 w-full h-full flex flex-col gap-2 items-center justify-center pointer-events-none">
                        <div className="flex gap-4 pointer-events-auto">
                            {/* Edit Controls */}
                            <button
                                className="px-4 py-2 rounded bg-[#26bfa6] text-white font-halvar font-semibold shadow hover:bg-[#173D3C] transition"
                                type="button"
                                tabIndex={-1}
                                onClick={handleEditControls}
                            >
                                Edit Controls
                            </button>
                            {/* View Reactor */}
                            <button
                                className="px-4 py-2 rounded bg-white text-[#173D3C] border-2 border-[#173D3C] font-halvar font-semibold shadow hover:bg-[#173D3C] hover:text-white transition"
                                type="button"
                                tabIndex={-1}
                                onClick={handleViewReactor}
                            >
                                View Reactor
                            </button>
                        </div>
                    </div>
                </div>
                {/* Main card */}
                <div className="bg-white min-w-[280px] border border-black rounded-lg shadow-md p-4 flex flex-col h-full relative z-0 transition">
                    <div className="flex-1">
                        <StepProgressBar currentStage={currentStage} />
                        <div className="flex flex-row items-end justify-center gap-6">
                            <div className="flex flex-col items-center w-full max-w-[70px]">
                                <SVGGauge value={rpm} min={0} max={900} units="rpm" title="" />
                            </div>
                            <div className="flex flex-col items-center w-full max-w-[100px]">
                                <SVGGauge value={temp} min={0} max={40} units="°C" title="" />
                            </div>
                            <div className="flex flex-col items-center w-full max-w-[70px]">
                                <SVGGauge value={psi} min={0} max={30} units="psi" title="" />
                            </div>
                        </div>
                        <LinePlotMock width={300} height={100} className="mt-4" phData={phData} doData={doData} />
                    </div>
                    <div className="mb-2">
                        <h3 className="font-halvar text-lg font-semibold text-[#262626] mb-1 text-center">
                            {title}
                        </h3>
                    </div>
                </div>
            </button>

            {/* Edit Dialog (unchanged) */}
            {dialogOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 w-full max-w-xs shadow-lg flex flex-col">
                        <h2 className="font-halvar font-bold text-lg mb-4 text-[#173D3C] text-center">Edit Controls</h2>
                        <label className="block mb-3">
                            <span className="block text-xs text-[#555] mb-1 font-halvar">Impeller RPM</span>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border rounded font-mono"
                                value={editRpm}
                                min={0} max={900} step={1}
                                onChange={e => setEditRpm(Number(e.target.value))}
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="block text-xs text-[#555] mb-1 font-halvar">Compressed Air PSI</span>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border rounded font-mono"
                                value={editPsi}
                                min={0} max={30} step={0.1}
                                onChange={e => setEditPsi(Number(e.target.value))}
                            />
                        </label>
                        <div className="flex gap-2 justify-end">
                            <button
                                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 font-halvar"
                                onClick={() => setDialogOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-3 py-1 rounded bg-[#26bfa6] text-white font-halvar hover:bg-[#173D3C]"
                                onClick={handleDialogSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
