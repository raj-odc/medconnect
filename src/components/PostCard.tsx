import * as React from "react";
import { Post, mockProfiles } from "../data/mockData";
import { StorageService } from "../services/storage";

interface PostCardProps {
  post: Post;
  onLike: () => void;
  onComment: () => void;
  currentUserId: string;
}

export function PostCard({ post, onLike, onComment, currentUserId }: PostCardProps) {
  const author = mockProfiles.find(p => p.id === post.userId);
  const storageService = StorageService.getInstance();
  const likes = storageService.getLikes(post.id);
  const comments = storageService.getComments(post.id);
  const hasLiked = likes.includes(currentUserId);

  return (
    <stackLayout className="bg-white rounded-lg p-4 m-2">
      <gridLayout rows="auto" columns="50, *, auto">
        <image
          col={0}
          src={author?.avatar}
          className="rounded-full w-12 h-12"
        />
        <stackLayout col={1} className="ml-2">
          <label className="font-bold" text={author?.name} />
          <label className="text-gray-500 text-sm" text={new Date(post.timestamp).toLocaleDateString()} />
        </stackLayout>
        <label col={2} className="text-blue-600" text={post.type} />
      </gridLayout>
      
      <label className="my-2" textWrap={true} text={post.content} />
      
      <gridLayout columns="auto, auto, *" className="mt-2">
        <button
          col={0}
          className={`mr-4 ${hasLiked ? 'text-blue-600' : 'text-gray-600'}`}
          text={`${likes.length} likes`}
          onTap={onLike}
        />
        <button
          col={1}
          className="text-gray-600"
          text={`${comments.length} comments`}
          onTap={onComment}
        />
      </gridLayout>

      {comments.length > 0 && (
        <stackLayout className="mt-2 pl-4 border-l-2 border-gray-200">
          {comments.map((comment, index) => (
            <label
              key={index}
              className="text-gray-700 text-sm my-1"
              textWrap={true}
              text={comment}
            />
          ))}
        </stackLayout>
      )}
    </stackLayout>
  );
}