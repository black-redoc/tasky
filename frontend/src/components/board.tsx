import BoardColumn from "./board-column";
import Button from "./button";

export default () => {
  return (
    <article className="flex flex-row gap-4 overflow-x-hidden hover:overflow-x-auto scroll-smooth py-2 items-start max-h-[36rem]">
      <BoardColumn
        boardName="New"
        items={[
          "TODO1",
          "TODO2",
          "TODO3",
          "TODO4",
          "TODO5",
          "TODO5",
          "TODO5",
          "TODO5",
          "TODO5",
          "TODO5",
          "TODO5",
          "TODO5",
          "TODO5",
          "TODO5",
          "TODO5",
          "TODO5",
          "TODO5",
          "TODO5",
          "TODO5",
          "TODO5",
          "TODO5",
        ]}
      />

      <BoardColumn
        boardName="Doing"
        items={["TODO1", "TODO2", "TODO3", "TODO4", "TODO5"]}
      />

      <BoardColumn
        boardName="Testing"
        items={["TODO1", "TODO2", "TODO3", "TODO4", "TODO5"]}
      />

      <BoardColumn
        boardName="Done"
        items={["TODO1", "TODO2", "TODO3", "TODO4", "TODO5"]}
      />
      <section className="flex flex-col justify-center items-center size-12 my-auto">
        <Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M9 12h6" />
            <path d="M12 9v6" />
          </svg>
        </Button>
      </section>
    </article>
  );
};
