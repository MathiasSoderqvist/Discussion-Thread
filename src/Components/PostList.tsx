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
  selectPage: (pageNumber: number) => void;
}

const PostList: React.FC<Props> = ({ posts, filteredPosts, filter, focusClicked, getPrevPage, getNextPage, selectPage }) => {
  const virtuoso = useRef<VirtuosoHandle>(null);
  const START_INDEX = 1;
  const INITIAL_ITEM_COUNT = 20;
  const FIRST_PAGE = 1;
  const LAST_PAGE = 5;
  console.log("Posts Length: ", posts.length);

  const [currentPagePrepend, setCurrentPagePrepend] = useState<number>(LAST_PAGE + 1)
  const [currentPageAppend, setCurrentPageAppend] = useState<number>(START_INDEX)
  const [currentPage, setCurrentPage] = useState<number>(START_INDEX)

  const prependItems = useCallback(() => {
    if (currentPagePrepend <= FIRST_PAGE) {
      setCurrentPagePrepend(LAST_PAGE + 1);
      console.log("in prpend func 1");
    }
    
    const previousPage = currentPagePrepend - 1;
    console.log("PREVPAGE:", previousPage)
    setTimeout(() => {
      setCurrentPage(previousPage);
      console.log("in prpend func 2");
      setCurrentPagePrepend(previousPage);
      getPrevPage(previousPage);
    }, 500);

    return false
  }, [currentPagePrepend, getPrevPage]);

  const appendItems = useCallback(() => {
    console.log("in append func 1");
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
  }, [currentPageAppend, getNextPage]);    

  return (
    <div >
      <Virtuoso
        firstItemIndex={currentPage+5} //make own variable for first item index
        initialTopMostItemIndex={INITIAL_ITEM_COUNT - 14}
        style={{ height: focusClicked ? "350px": "600px", width: "80%" }}
        ref={virtuoso}
        data={filter ? filteredPosts : posts}
        startReached={prependItems}
        endReached={appendItems}
        itemContent={(index, post) => 
          <div>
            <PostListItem 
              key={index+1*Math.random()} 
              username={post.userName} 
              img={post.userProfileImgUrl}
              comment={post.comment}
              postedOn={post.postedOn}
            />
          </div>}
        />  
      <NumberPicker 
      virtuoso={virtuoso}
      selectPage={selectPage}
      />
    </div>
      )
}

export default PostList;

