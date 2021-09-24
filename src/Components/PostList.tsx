import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Post } from '../interfaces';
import PostListItem from './PostListItem';
import NumberPicker from './NumberPicker';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'

interface Props {
  posts: Post[];
  filteredPosts: Post[];
  filter: boolean;
  focusClicked: boolean;
  getNextPage: (pageNumber: number) => void;
  getPrevPage: (pageNumber: number) => void;
}

const PostList: React.FC<Props> = ({ posts, filteredPosts, filter, focusClicked, getPrevPage, getNextPage }) => {
  const virtuoso = useRef<VirtuosoHandle>(null);
  const START_INDEX = 1;
  const INITIAL_ITEM_COUNT = 20;
  const FIRST_PAGE = 1;
  const LAST_PAGE = 6;
  console.log("Posts Length: ", posts.length);

  const [currentPagePrepend, setCurrentPagePrepend] = useState<number>(START_INDEX)
  const [currentPageAppend, setCurrentPageAppend] = useState<number>(START_INDEX)
  const [currentPage, setCurrentPage] = useState<number>(START_INDEX)

  const prependItems = useCallback(() => {
    if (currentPagePrepend <= FIRST_PAGE) {
      setCurrentPagePrepend(LAST_PAGE);
    }
    const previousPage = currentPagePrepend - 1;

    setTimeout(() => {
      setCurrentPage(previousPage);
      setCurrentPagePrepend(previousPage);
      getPrevPage(previousPage);
    }, 500);

    return false
  }, [currentPagePrepend, getPrevPage])

  const appendItems = useCallback(() => {
    if (currentPageAppend >= LAST_PAGE) {
      setCurrentPageAppend(FIRST_PAGE);
    }
    const nextPage = currentPageAppend + 1

    setTimeout(() => {
      setCurrentPage(nextPage);
      setCurrentPageAppend(nextPage); 
      getNextPage(nextPage);
    }, 500);

    return false
  }, [currentPageAppend, getNextPage])    

  return (
    <div >
      <Virtuoso
        firstItemIndex={currentPage+5}
        initialTopMostItemIndex={INITIAL_ITEM_COUNT - 10}
        style={{ height: focusClicked ? "350px": "600px", width: "80%" }}
        totalCount={20}
        ref={virtuoso}
        data={filter !== undefined && filter ? filteredPosts : posts}
        startReached={prependItems}
        endReached={appendItems}
        itemContent={(index, post) => <div>
            <PostListItem 
              key={index+1*Math.random()} 
              username={post.userName} 
              img={post.userProfileImgUrl}
              comment={post.comment}
              postedOn={post.postedOn}
            />
          </div>}
        />  
      <NumberPicker virtuoso={virtuoso}/>
    </div>
      )
}

export default PostList;

