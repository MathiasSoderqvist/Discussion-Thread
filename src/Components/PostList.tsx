/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useCallback, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { Post } from '../interfaces';
import PostListItem from './PostListItem';
import NumberPicker from './NumberPicker';

interface Props {
  posts: Post[];
  filteredPosts: Post[];
  filter: boolean;
  focusClicked: boolean;
  getNextPage: (pageNumber: number) => void;
  getPrevPage: (pageNumber: number) => void;
  selectPage: (pageNumber: number) => void;
  checkFirstPage: () => void;
  checkLastPage: () => void;
  currentPage: number;
  currentPagePrepend: number;
  currentPageAppend: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PostList = ({
  // eslint-disable-next-line max-len
  posts, filteredPosts, filter, focusClicked, getPrevPage, getNextPage, selectPage, currentPage, currentPagePrepend, currentPageAppend, checkFirstPage, checkLastPage,
}: Props) => {
  const virtuoso = useRef<VirtuosoHandle>(null);
  const INITIAL_ITEM_COUNT = 20;
  console.log('Posts Length: ', posts.length);

  const prependItems = useCallback(() => {
    checkFirstPage();
    const previousPage = currentPagePrepend - 1;

    console.log('PREVPAGE:', previousPage);
    setTimeout(() => {
      getPrevPage(previousPage);
    }, 500);

    return false;
  }, [currentPagePrepend, getPrevPage]);

  const appendItems = useCallback(() => {
    console.log('in append func 1');
    checkLastPage();
    const nextPage = currentPageAppend + 1;

    setTimeout(() => {
      getNextPage(nextPage);
    }, 500);

    return false;
  }, [currentPageAppend, getNextPage]);

  return (
    <div>
      <Virtuoso
        firstItemIndex={currentPage + 5} // make own variable for first item index
        initialTopMostItemIndex={INITIAL_ITEM_COUNT - 14}
        style={{ height: focusClicked ? '350px' : '600px', width: '80%' }}
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
