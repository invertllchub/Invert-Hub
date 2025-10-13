"use client";
import React from "react";
import { Trash2 } from "lucide-react";
import { showToast } from "../jobs/Toast";

type DeleteBtnProps = {
    page: string;
    id?: string | number; 
    selectedIds?: string[] | number[];
    onDeleted?: () => void; 
};

function DeleteBtn({ page, id, selectedIds = [], onDeleted }: DeleteBtnProps) {
    const handleDeleteOne = async () => {
        const toastId = showToast("loading", {
            message: "Submitting Project Application...",
        });

        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`/api/${page}/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete project");

            showToast("success", {
                message: "Project deleted successfully",
                toastId,
            });
            onDeleted?.();
        } catch (err) {
            console.error(err);
            showToast("error", {
                message: "Something went wrong while deleting",
                toastId,
            });
        }
    };


    const handleDeleteSelected = async () => {
        const toastId = showToast("loading", {
            message: "Submitting Project Application...",
        });

        if (selectedIds.length === 0) {
            showToast("error", {
                message: "No projects selected",
                toastId,
            });
            return;
        }

        if (!confirm(`Delete ${selectedIds.length} selected projects?`)) return;

        try {
            await Promise.all(
                selectedIds.map((id) =>
                    fetch(`/api/${page}/${id}`, { method: "DELETE" })
                )
            );

            showToast("success", {
                message: "Selected projects deleted successfully",
                toastId,
            });
            onDeleted?.();
        } catch (err) {
            console.error(err);
            showToast("error", {
                message: "Error deleting selected projects",
                toastId,
            });
        }
    };

    return (
        <div
        title={id ? "Delete this project" : "Delete selected projects"}
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-full"
        onClick={id ? handleDeleteOne : handleDeleteSelected}
        >
            <Trash2 size={20} />
        </div>
    );
}

export default DeleteBtn;
