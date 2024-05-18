import { useState } from "react";
import { deleteProject as deleteProjectService } from "../services/projects.service";
import { setToastMessage } from "../store/toast.store";
import DeleteConfirmation from "./delete-confirmation";
import { deleteProject as deleteProjectStore } from "../store/project.store";

export default ({ id, title }: { id?: number; title?: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteProject = async () => {
    if (!id) {
      return;
    }
    setIsDeleting(true);
  };

  const onCancel = () => {
    setIsDeleting(false);
  };
  const onSure = async () => {
    if (!id) {
      return;
    }
    const response = await deleteProjectService({ id });
    setIsDeleting(false);
    if (Object.keys(response).includes("error")) {
      setToastMessage({ message: `Error: ${response.error}`, isError: true });
      return;
    }
    deleteProjectStore({ id });
    setToastMessage({ message: "Project deleted successfully" });
  };
  return (
    <>
      {isDeleting ? (
        <DeleteConfirmation
          title={title ?? ""}
          isProject={true}
          onCancel={onCancel}
          onSure={onSure}
        />
      ) : (
        <></>
      )}
      <svg
        onClick={deleteProject}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-trash text-red-500 hover:text-red-400  font-medium"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 7l16 0"></path>
        <path d="M10 11l0 6"></path>
        <path d="M14 11l0 6"></path>
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
      </svg>
    </>
  );
};
