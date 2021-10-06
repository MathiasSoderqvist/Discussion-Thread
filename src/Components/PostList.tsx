/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useCallback, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { Post } from '../interfaces';
import PostListItem from './PostListItem';
import NumberPicker from './NumberPicker';

interface Props {
  posts: Post[] | undefined;
  filteredPosts: Post[] | undefined;
  filter: boolean;
  focusClicked: boolean;
  getNextPage: () => void;
  getPrevPage: () => void;
  selectPage: (pageNumber: number) => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PostList = ({
  posts,
  filteredPosts,
  filter,
  focusClicked,
  getPrevPage,
  getNextPage,
  selectPage,
}: Props) => {
  const virtuoso = useRef<VirtuosoHandle>(null);
  const INITIAL_ITEM_COUNT = 20;
  const firstItem = 5;

  const prependItems = useCallback(() => {
    setTimeout(() => {
      getPrevPage();
    }, 500);

    return false;
  }, [getPrevPage]);

  const appendItems = useCallback(() => {
    setTimeout(() => {
      getNextPage();
    }, 500);

    return false;
  }, [getNextPage]);

  return (
    <div>
      <Virtuoso
        firstItemIndex={firstItem}
        initialTopMostItemIndex={INITIAL_ITEM_COUNT - 14}
        style={{ height: focusClicked ? '375px' : '700px', width: '80%' }}
        ref={virtuoso}
        data={filter ? filteredPosts : posts}
        startReached={prependItems}
        endReached={appendItems}
        itemContent={(index, post) => (
          <div>
            <PostListItem
              key={index + 1 * Math.random()}
              username={post.userName}
              img={post.userProfileImgUrl}
              comment={post.comment}
              postedOn={post.postedOn}
            />
          </div>
        )}
      />
      <NumberPicker
        virtuoso={virtuoso}
        selectPage={selectPage}
      />
    </div>
  );
};

export default PostList;
