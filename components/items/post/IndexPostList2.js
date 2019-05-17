import PostItem2 from './PostItem2';
import PostItem3 from './PostItem3';
import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';;
import { i18n, Link, withNamespaces, Router } from '../../../configs/i18next';

import { withRouter } from 'next/router';

import { getPostsByTypeAndLang as getPostsByTypeAndLangApi, getPostsByTypeAndLang2 as getPostsByTypeAndLang2Api, getPostNameForURL as getPostNameForURLApi } from '../../../apis/postApi';

const IndexPostList = (props) => {

    const [posts1, setPosts1] = useState([]);

    useEffect(() => {
        let isSubscribed = true;

        async function getPost() {
            const lang = `["${props.lng}"]`;
            const type = `["${props.type}"]`;

            const getPostsRes = await getPostsByTypeAndLangApi({
                skip: 0,
                limit: 4,
                sortBy: "",
                type: type,
                lang: lang
            });

            if (getPostsRes && getPostsRes.status === 200) {
                const getPostsData = await getPostsRes.json();
                if (getPostsData) {
                    if (isSubscribed) {

                        setPosts1(getPostsData.data.postByTypeAndLang.posts);
                    };
                } else {
                    console.log("get data failed");
                }
            } else {
                console.log("get data failed");
            }
        }
        if (isSubscribed) {
            getPost();
        };

        return () => isSubscribed = false;
    }, [])

    const [posts2, setPosts2] = useState([]);

    useEffect(() => {
        let isSubscribed = true;

        async function getPost() {
            const lang = `["${props.lng}"]`;
            const type = `["${props.type}"]`;

            const getPostsRes = await getPostsByTypeAndLang2Api({
                skip: 0,
                limit: 6,
                sortBy: "",
                type: type,
                lang: lang
            });

            if (getPostsRes && getPostsRes.status === 200) {
                const getPostsData = await getPostsRes.json();
                if (getPostsData) {
                    if (isSubscribed) {
                        console.log(111, getPostsData);
                        setPosts2(getPostsData.data.postByTypeAndLang2.posts);
                    };
                } else {
                    console.log("get data failed");
                }
            } else {
                console.log("get data failed");
            }
        }
        if (isSubscribed) {
            getPost();
        };

        return () => isSubscribed = false;
    }, [])

    return (
        <>
            <div className="post-list-container-1">
                <div className="post-list-container-2">
                    <div className="posts-group-1">
                        <div className="post-group-1-1-container-1">
                            <div className="post-group-1-1-container-2">
                                <div className="post-group-1-1-container-3">

                                </div>
                            </div>
                            {posts1.length !== 0 ? <div className="post-info-container-1">
                                <div className="name-container-1">
                                    <div className="name">
                                        {posts1[0].detail.nameByLang}
                                    </div>

                                </div>
                                <div className="view-container-1 noselect">
                                    <div className="view-container-2">
                                        <div className="view-icon">
                                            <i className="fas fa-eye"></i>
                                        </div>
                                        <div className="number-of-views">
                                            {posts1[0].numberOfViews}
                                        </div>
                                    </div>
                                </div>
                            </div> : null}

                        </div>
                        <div className="post-group-1-2-container-1">
                            {posts1.length !== 0 ? posts1.slice(1).map(post => <div key={post._id} className="post-group-1-2">
                                <PostItem2 post={post} />
                            </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="posts-group-2">
                        {posts2.length !== 0 ? posts2.map(post => <PostItem3 key={post._id} post={post} />) : null}
                    </div>
                    <div className="posts-group-3">

                    </div>
                </div>
            </div>
            <style jsx>{`
                .post-list-container-1 {
                    display: flex;
                    flex-direction: column;

                    align-items: center;
                }

                .post-list-container-2 {
                    display: flex;
                    flex-direction: column;

                    width: 100%;
                }

                .posts-group-1 {
                    display: flex;
                    flex-direction: column;
                    
                    background-color: #37474f;
                    // height: 300px;

                    padding: 5px;
                }

                .post-group-1-1-container-1 {
                    display: flex;
                    position: relative;
                }
                .post-group-1-1-container-2 {
                    display: block;
                    width: 100%;
                }

                .post-group-1-1-container-3 {
                    display: block;
                    padding-bottom: 40%;

                    background: url(${posts1.length !== 0 ? posts1[0].detail.image.dataUrl : ''});
                    background-position: center;
                    background-size:     cover;                
                    background-repeat:   no-repeat;
                }

                .post-group-1-2-container-1 {
                    display: flex;
                    flex-direction: row;
                    margin-top: 5px;
                    margin-right: -10px;
                }

                .post-group-1-2 {
                    display: flex;


                    width: 290px;
                    height: 145px;
                    margin-right: 5px;
                }

                .post-info-container-1{
                    display: flex;
                    flex-direction: row;

                    position: absolute;
                    bottom: 0;
                    right: 0;
                    left: 0;

                    color: white;
                    padding: 10px 10px;
                    background-color: rgba(0,0,0,.6);;
                }

                .name-container-1{
                    display: flex;
                    flex: 1;
                }

                .name {
                    font-size: 18px;

                }

                .view-container-1{
                    display: flex;
                    flex-direction: column;

                    margin-left: 10px;
                }

                .view-container-2{
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    border-radius: 5px;
                    padding: 5px;

                    // background-color: #f2f2f3;
                    color: white;
                }

                .view-icon {
                    display: flex;
                }

                .number-of-views{
                    display: flex;

                    margin-left: 5px;
                }

                .posts-group-2 {
                    display: flex;
                    flex-direction: column;
                
                    padding: 20px;
                }
            `}</style>
        </>
    )
};

IndexPostList.getInitialProps = async function () {
    return {
        namespacesRequired: ['index']
    }
};

IndexPostList.propTypes = {
    t: PropTypes.func.isRequired
};

export default withRouter(withNamespaces('index')(IndexPostList));