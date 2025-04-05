import React, { useState, useEffect } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { MdOutlineDragIndicator } from "react-icons/md";



interface DraggableListProps {
  initialItems: any[];
  onReorder: (newOrder: any[]) => void;
  dragIcon?: React.ReactNode;
}

const DraggableList: React.FC<DraggableListProps> = ({
  initialItems,
  onReorder,
}) => {
  const [items, setItems] = useState<any[]>(initialItems);
  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: any) => {
    setDraggingItem(item);
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    _e: React.DragEvent<HTMLDivElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      //   const reorderedItems = updatedItems.map((item, index) => ({
      //     ...item,
      //     position: index + 1
      // }));

      setItems(updatedItems);
      onReorder(updatedItems);
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    onReorder(updatedItems);
  };

  return (
    <div className="flex flex-col gap-4.5">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`item ${
            item === draggingItem ? "" : ""
          } px-4 rounded-sm shadow-2 relative bg-[#F2F2F280] dark:bg-slate-500/55 dark:text-slate-50 text-black w-full py-3 flex items-center gap-3 cursor-grab`}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, item)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, item)}
        >
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#6B6B6B] text-white">
            <span>{index + 1}</span>
          </div>
          <div className="">
            <span>{item.title}</span>
          </div>

          <div className="ml-auto flex items-center gap-2 text-black/50 dark:text-slate-100">
          <span className="">
            <MdOutlineDragIndicator
              size={22}
              className="transform rotate-90"
            />
          </span>
            <button
              onClick={() => {
                handleRemove(item.id);
              }}
            >
              <BsXCircleFill
                size={20}
                className=" hover:text-red-500"
              />
            </button>
          </div>

         
        </div>
      ))}
    </div>
  );
};



export default DraggableList;
