


import { Model } from 'objection';
import knexConfigs from '../../knex.configs';

class PostsModel extends Model {
    static get idColumn() { return 'posts_id'; }

    static get tableName() { return 'posts'; }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [],
            properties: {
                id: { type: 'integer' },
            }
        }
    }

    $beforeInsert() {
        const date = new Date();
        this.created_at = date;
    }

    $beforeUpdate() {
        const date = new Date();
        this.updated_at = date;
    }


    static currentOffset = 0;




static async getPosts(id) {
  try {
    const limit = 3;

    const postIds = await PostsModel.query()
      .select('posts_id')
      .whereNot('user_id', id)
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(this.currentOffset);

    const postIdArray = postIds.map(post => post.posts_id);

    if (postIdArray.length === 0) {
      this.currentOffset = 0;
      console.log("Reached end of posts, resetting offset.");
      return [];
    }

    const rawData = await PostsModel.query()
      .select(
        'posts.posts_id',
        'posts.postText',
        'posts.postPhoto',
        'posts.likeCount',
        'posts.commentCount',
        'posts.user_id as postUserId',
        'posts.created_at as postCreatedAt',
        'posts.updated_at as postUpdatedAt',
        'users.name as postUserName',
        'users.surname as postUserSurname',
        'users.profileImg as postUserProfileImg',
        'comments.comments_id',
        'comments.commentText',
        'comments.created_at as commentCreatedAt',
        'commentUsers.id as commentUserId',
        'commentUsers.profileImg as commentUserProfileImg',
        'commentUsers.name as commentUserName',
        'commentUsers.surname as commentUserSurname',
        'replies.replies_id',
        'replies.repliesText',
        'replies.created_at as replyCreatedAt',
        'replyUsers.id as replyUserId',
        'replyUsers.profileImg as replyUserProfileImg',
        'replyUsers.name as replyUserName',
        'replyUsers.surname as replyUserSurname'
      )
      .join('users', 'posts.user_id', 'users.id')
      .leftJoin('comments', 'comments.posts_id', 'posts.posts_id')
      .leftJoin('users as commentUsers', 'comments.user_id', 'commentUsers.id')
      .leftJoin('replies', 'replies.comments_id', 'comments.comments_id')
      .leftJoin('users as replyUsers', 'replies.user_id', 'replyUsers.id')
      .whereIn('posts.posts_id', postIdArray)
      .orderBy('posts.created_at', 'desc')
      .orderBy('comments.created_at', 'asc')
      .orderBy('replies.created_at', 'asc');

    const postsMap = {};
    rawData.forEach(row => {
      if (!postsMap[row.posts_id]) {
        postsMap[row.posts_id] = {
          posts_id: row.posts_id,
          postText: row.postText,
          postPhoto: row.postPhoto,
          likeCount: row.likeCount,
          commentCount: 0,
          user_id: row.postUserId,
          postCreatedAt: row.postCreatedAt,
          postUpdatedAt: row.postUpdatedAt,
          userName: row.postUserName,
          userSurname: row.postUserSurname,
          userProfileImg: row.postUserProfileImg,
          comments: []
        };
      }

      const postEntry = postsMap[row.posts_id];

      if (row.comments_id) {
        let comment = postEntry.comments.find(comment => comment.comments_id === row.comments_id);
        if (!comment) {
          comment = {
            comments_id: row.comments_id,
            commentText: row.commentText,
            commentCreatedAt: row.commentCreatedAt,
            user_id: row.commentUserId,
            userProfileImg: row.commentUserProfileImg,
            userName: row.commentUserName,
            userSurname: row.commentUserSurname,
            replies: []
          };
          postEntry.comments.push(comment);
          postEntry.commentCount++;
        }

        if (row.replies_id) {
          comment.replies.push({
            replies_id: row.replies_id,
            repliesText: row.repliesText,
            user_id: row.replyUserId,
            userProfileImg: row.replyUserProfileImg,
            userName: row.replyUserName,
            userSurname: row.replyUserSurname,
            replyCreatedAt: row.replyCreatedAt
          });
          postEntry.commentCount++;
        }
      }
    });

    const result = Object.values(postsMap).map(post => ({
      ...post,
      comments: post.comments.sort((a, b) => new Date(a.commentCreatedAt) - new Date(b.commentCreatedAt))
    }));

    this.currentOffset += limit;

    if (result.length === 0) {
      this.currentOffset = 0;
      console.log("Reached end of posts, resetting offset and fetching again.");
      return this.getPosts(id); 
    }

    return result.reverse(); 
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}




static async getPostsById(user_id) {
    try {
      const rawData = await PostsModel.query()
        .where('posts.user_id', user_id)
        .orderBy('posts.created_at', 'desc')
        .select(
          'posts.posts_id',
          'posts.postText',
          'posts.postPhoto',
          'posts.likeCount',
          'posts.commentCount',
          'posts.user_id as postUserId',
          'posts.created_at as postCreatedAt',
          'posts.updated_at as postUpdatedAt',
          'users.name as postUserName',
          'users.surname as postUserSurname',
          'users.profileImg as postUserProfileImg',
          'comments.comments_id',
          'comments.commentText',
          'comments.created_at as commentCreatedAt',
          'commentUsers.id as commentUserId',
          'commentUsers.profileImg as commentUserProfileImg',
          'commentUsers.name as commentUserName',
          'commentUsers.surname as commentUserSurname',
          'replies.replies_id',
          'replies.repliesText',
          'replies.created_at as replyCreatedAt',
          'replyUsers.id as replyUserId',
          'replyUsers.profileImg as replyUserProfileImg',
          'replyUsers.name as replyUserName',
          'replyUsers.surname as replyUserSurname'
        )
        .join('users', 'posts.user_id', 'users.id')
        .leftJoin('comments', 'comments.posts_id', 'posts.posts_id')
        .leftJoin('users as commentUsers', 'comments.user_id', 'commentUsers.id')
        .leftJoin('replies', 'replies.comments_id', 'comments.comments_id')
        .leftJoin('users as replyUsers', 'replies.user_id', 'replyUsers.id')
        .orderBy('posts.created_at', 'desc')
        .orderBy('comments.created_at', 'asc')
        .orderBy('replies.created_at', 'asc');
  
      const postsMap = {};
      rawData.forEach(row => {
        if (!postsMap[row.posts_id]) {
          postsMap[row.posts_id] = {
            posts_id: row.posts_id,
            postText: row.postText,
            postPhoto: row.postPhoto,
            likeCount: row.likeCount,
            commentCount: 0, 
            user_id: row.postUserId,
            postCreatedAt: row.postCreatedAt,
            postUpdatedAt: row.postUpdatedAt,
            userName: row.postUserName,
            userSurname: row.postUserSurname,
            userProfileImg: row.postUserProfileImg,
            comments: []
          };
        }
  
        const postEntry = postsMap[row.posts_id];
  
        if (row.comments_id) {
          let comment = postEntry.comments.find(comment => comment.comments_id === row.comments_id);
          if (!comment) {
            comment = {
              comments_id: row.comments_id,
              commentText: row.commentText,
              commentCreatedAt: row.commentCreatedAt,
              user_id: row.commentUserId,
              userProfileImg: row.commentUserProfileImg,
              userName: row.commentUserName,
              userSurname: row.commentUserSurname,
              replies: []
            };
            postEntry.comments.push(comment);
            postEntry.commentCount++; 
          }
  
          if (row.replies_id) {
            comment.replies.push({
              replies_id: row.replies_id,
              repliesText: row.repliesText,
              user_id: row.replyUserId,
              userProfileImg: row.replyUserProfileImg,
              userName: row.replyUserName,
              userSurname: row.replyUserSurname,
              replyCreatedAt: row.replyCreatedAt
            });
            postEntry.commentCount++; 
          }
        }
      });
  
      const result = Object.values(postsMap).map(post => ({
        ...post,
        comments: post.comments.map(comment => ({
          ...comment,
          replies: comment.replies.sort((a, b) => new Date(a.replyCreatedAt) - new Date(b.replyCreatedAt))
        })).sort((a, b) => new Date(a.commentCreatedAt) - new Date(b.commentCreatedAt))
      }));
  
      return result.reverse();
    } catch (error) {
      console.error('Error fetching posts by id:', error);
      throw error;
    }
  }
  

  static async delPostsById(posts_id) {
    try {
      
      const result = await PostsModel.query().deleteById(posts_id);
  
      if (result) {
        console.log(`Successfully deleted post with ID ${posts_id}`);
        return { success: true, message: 'Post deleted successfully' };
      } else {
        console.log(`Post with ID ${posts_id} not found`);
        return { success: false, message: 'Post not found' };
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }
  
  



    static async addPosts({ user_id, postText, postPhoto }) {
        console.log("Adding post with data:", { user_id, postText, postPhoto });
        const data = await this.query().insert({
            user_id,
            postText,
            postPhoto,
            likeCount: 0,
            commentCount: 0
        });
        return data;
    }


    static async getPhotosById(user_id) {
      try {
        const photosById = await PostsModel.query()
          .where('user_id', user_id)
          .whereNotNull('postPhoto')
          .andWhere('postPhoto', 'not like', '%undefined%')
          .select('user_id', 'posts_id', 'postPhoto')
          .orderBy('created_at', 'desc');
          
        return photosById;
      } catch (error) {
        console.error('Error fetching photos by id:', error);
        throw error;
      }
    }
    

}




export default PostsModel;
