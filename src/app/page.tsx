"use client";
import data from "./data.json";
import { DocumentIcon, ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type Item = {
  name: string;
  type: string;
  children?: Item[] | null | undefined;
};

const FileTree = ({
  treeData,
  level = 0,
}: {
  treeData: Item;
  level?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mx-auto flex justify-center  h-full w-full text-white">
      <div className="bg-gray-900 h-full w-96">
        <div
          style={{ paddingLeft: `${level * 24}px` }}
          className="px-4 py-2 gap-2 border border-gray-500 border-b border-x-0 border-t-0 flex justify-start hover:cursor-pointer hover:bg-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {treeData?.type === "folder" 
            ? (isOpen ? <ChevronDownIcon className="h-5 w-5 text-gray-300" /> : <ChevronRightIcon className="h-5 w-5 text-gray-300" />)
            : <DocumentIcon className="h-5 w-5 text-blue-400" />
          }
          {treeData?.name}
        </div>
        {(treeData?.children ?? []).length > 0 && isOpen &&
          treeData.children!.map((item, index) => (
            <FileTree key={index} treeData={item} level={level + 1} />
          ))}
      </div>
    </div>
  );
};

const Home = () => {
  return <FileTree treeData={data} />;
};

export default Home;
