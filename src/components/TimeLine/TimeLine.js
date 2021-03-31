import React from 'react';
import { withRouter } from 'react-router';
import Post from './parts/Post';
import { getCacheList } from '../../functions/lists';
import firebase, { getIdToken } from '../../Firebase';

class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listId: (this.props.location.pathname === "/") ? this.props.state.userInfo.follow.match(/^lists\/(.*)$/)[1] : this.props.match.params.id
        }
    }

    componentDidMount = () => {
        if (true || this.props.state?.lists?.[this.state.listId] === undefined) {
            console.log("aaa");
            getIdToken().then(token => getCacheList(
                token,
                this.props.state.userInfo.id,
                this.state.listId,
                true,
                false,
                true,
                this.props.accessor
            ));
        }
    }

    render() {
        console.log(this.props.state)
        if (this.props.state.posts === undefined || this.props.state.lists === undefined) {
            return null;
        }
        console.log(this.props.state.lists[this.state.listId])
        return (
            <div className="dark:text-white scrollbar-thin scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-400 overflow-y-scroll">
                {this.props.state.lists[this.state.listId] === undefined ? (
                    <div>
                        {Array.from({ length: 3 }, (v, k) => (
                            <Post loading={true} key={k} />
                        ))}
                    </div>
                ) : this.props.state.lists[this.state.listId].map((postId, k) => (
                    <Post key={k} data={this.props.state.posts[postId]} state={this.props.state}/>
                )
                )}
            </div>
        )
    }
}

export default withRouter(TimeLine);