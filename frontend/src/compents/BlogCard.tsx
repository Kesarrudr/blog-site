interface BlogCardParams {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardParams) => {
  return (
    <div>
      <div className="flex justify-center items-center space-x-2">
        <div className="text-sm font-medium w-1/2 h-16 flex justify-end items-center">
          {authorName}
        </div>
        <span className="flex w-1 h-1  bg-gray-200 rounded-full "></span>
        <div className=" text-slate-500 text-sm font-normal w-1/2 h-16 flex justify-start items-center">
          {publishedDate}
        </div>
      </div>
      <div>{title}</div>
      <div>{content.slice(0, 100) + "...."}</div>
      <div>{`${Math.ceil(content.length / 100)}minutes`}</div>
      <div className="bg-slate-200 h-1 w-full"></div>
    </div>
  );
};
