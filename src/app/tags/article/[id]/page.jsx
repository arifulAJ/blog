import React from "react";
import getArticleById from "../../../component/libs/getArticleById";
import getUseById from "../../../component/libs/getUseById";
import Image from "next/image";
import ShowComments from "../../../component/utils/showComments/showComments";

const showTagsArticle = async ({ params }) => {
  const findArticleById = await getArticleById(params.id);
  const userId = findArticleById.author.id;
  const findUserById = await getUseById(userId);

  const created = new Date(findArticleById.createdAt);
  const createdAt = created.toLocaleString();
  return (
    <div className=" px-2 sm:px-32 md:px-24 py-12">
      <div className="py-3">
        <button className="bg-button-color text-white font-semibold  px-5 rounded-full">
          {findArticleById.tags}
        </button>
        <h1 className="font-bold text-slate-700  md:text-4xl">
          {findArticleById.title}
        </h1>
      </div>
      <div className="flex pt-3 pb-8  ">
        <img
          className="rounded-full w-12 h-12  border"
          src={findUserById.avatar}
          alt="author"
        />
        <div className="px-2 text-slate-500">
          <h1 className="uppercase">by {findArticleById.author.name}</h1>
          <h1>{createdAt}</h1>
        </div>
      </div>
      <div>
        <Image
          className="rounded-2xl"
          src={findArticleById.cover}
          width={1600}
          height={4000}
          alt={`${findArticleById.tags} image not found`}
        />
        <p className="text-center italic text-slate-500">
          Uploded by, {findArticleById.author.name}
        </p>
      </div>
      <div className="py-12">
        <p className="text-2xl text-slate-700">{findArticleById.body}</p>
      </div>
      <ShowComments />
    </div>
  );
};

export default showTagsArticle;
