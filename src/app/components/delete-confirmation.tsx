import Button from "./button";

export default function DeleteConfirmation({
  title,
  onCancel,
  onSure,
  isProject,
}: {
  title: string;
  onCancel: any;
  onSure: any;
  isProject?: boolean;
}) {
  return (
    <section className="absolute top-0 bottom-0 left-0 right-0 bg-slate-800/80 flex items-center justify-center">
      <article className="bg-sky-100 w-[18rem] h-[10rem] px-3 py-2 flex flex-col justify-between rounded relative">
        <svg
          role="button-cancel"
          onClick={onCancel}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-x absolute top-1 right-1 cursor-pointer"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>

        <p className="pr-3 text-pretty">
          Are you sure you want to delete the {isProject ? "project" : "task"}
          <span className="font-medium ml-1">&apos;{title}&apos;?</span>
        </p>
        <aside className="flex flex-row justify-center gap-4">
          <Button
            primaryColor={false}
            borderActive={true}
            width="w-32"
            content="Save"
            fontSize="text-base"
            textColor="text-cyan-700"
            fontWeight="font-medium"
            onClick={onSure}
          >
            Sure
          </Button>
          <Button
            onClick={onCancel}
            primaryColor={true}
            width="w-32"
            content="Save"
            fontSize="text-base"
            textColor="text-white"
            fontWeight="font-normal"
          >
            Cancel
          </Button>
        </aside>
      </article>
    </section>
  );
}
