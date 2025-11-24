// import { useAuth } from '../context/authContext';
// import { useEffect, useState } from 'react';
// import {
//   createPost,
//   getAllPosts,
//   getMyPosts,
// } from '../../services/post.service';
//
// export default function Blog() {
//   const { user } = useAuth();
//   const [posts, setPosts] = useState<any[]>([]);
//   const [myPosts, setMyPosts] = useState<any[]>([]);
//   const [form, setForm] = useState({ title: '', content: '', tags: '' });
//   const [error, setError] = useState('');
//   const [image, setImage] = useState<File | null>(null);
//   const [page, setPage] = useState(1);
//   const [totalPage, setTotalPage] = useState(1);
//
//   const isApprovedAuthor =
//     user?.role?.includes('AUTHOR') &&
//     user?.approved?.toLowerCase() === 'approved';
//
//   const isPendingAuthor =
//     user?.role?.includes('AUTHOR') &&
//     user?.approved?.toLowerCase() === 'pending';
//
//   console.log('isApprovedAuthor', isApprovedAuthor);
//
//   useEffect(() => {
//     fetchAllPosts();
//     if (isApprovedAuthor) {
//       fetchMyPosts();
//     }
//   }, []);
//
//   const fetchAllPosts = async (pageNumber = 1) => {
//     try {
//       const res = await getAllPosts(pageNumber, 3);
//       setPosts(res.data || []);
//       setTotalPage(res?.totalPages);
//       setPage(pageNumber);
//     } catch (error: any) {
//       setError(error?.response?.data?.message || 'Failed to fetch posts.!');
//     }
//   };
//
//   const fetchMyPosts = async () => {
//     try {
//       const res = await getMyPosts(1, 3);
//       setMyPosts(res.data || []);
//     } catch (error: any) {
//       setError(error?.response?.data?.message || 'Failed to fetch my posts.!');
//     }
//   };
//
//   const handleCreatePost = async () => {
//     try {
//       await createPost(form.title, form.content, form.tags, image as File);
//       setForm({ title: '', content: '', tags: '' });
//       await fetchAllPosts();
//       await fetchMyPosts();
//     } catch (error: any) {
//       setError(error?.response?.data?.message || 'Failed to create post.!');
//     }
//   };
//
//   return (
//     <div className="p-6 max-w-4xl mx-auto font-sans">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Blog</h2>
//
//       {/* --- ALERTS --- */}
//       {error && (
//         <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
//           {error}
//         </div>
//       )}
//
//       {/* Pending author message */}
//       {isPendingAuthor && (
//         <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded text-yellow-700">
//           You are registered as an Author but still not approved by Admin. You
//           can view posts, but cannot create your own until approval.
//         </div>
//       )}
//
//       {/* --- CREATE POST FORM (for Approved Authors) --- */}
//       {isApprovedAuthor && (
//         <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
//           <h3 className="text-lg font-semibold text-gray-800 mb-3">
//             Create New Post
//           </h3>
//           <input
//             className="border border-gray-300 p-2 w-full mb-3 rounded"
//             placeholder="Title"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//           />
//           <textarea
//             className="border border-gray-300 p-2 w-full mb-3 rounded"
//             placeholder="Content"
//             value={form.content}
//             onChange={(e) => setForm({ ...form, content: e.target.value })}
//             rows={3}
//           />
//           <input
//             className="border border-gray-300 p-2 w-full mb-3 rounded"
//             placeholder="Tags (comma separated)"
//             value={form.tags}
//             onChange={(e) => setForm({ ...form, tags: e.target.value })}
//           />
//
//           <input
//             className="block w-full text-sm text-gray-600 mb-4"
//             type="file"
//             accept="image/*"
//             onChange={(e) =>
//               setImage(e.target.files ? e.target.files[0] : null)
//             }
//           />
//           <button
//             onClick={handleCreatePost}
//             className="bg-blue-600 text-white px-5 py-2 rounded font-medium hover:bg-blue-700"
//           >
//             Publish
//           </button>
//         </div>
//       )}
//
//       {/* --- ALL POSTS --- */}
//       <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
//         All Posts
//       </h3>
//       {posts.length === 0 ? (
//         <p className="text-gray-500">No posts yet.</p>
//       ) : (
//         <>
//           <div className="space-y-4">
//             {posts.map((p) => (
//               <div
//                 key={p._id}
//                 className="border border-gray-200 p-4 rounded-lg bg-white"
//               >
//                 <h4 className="text-lg font-bold text-gray-800">{p.title}</h4>
//                 <p className="text-gray-700 mt-1">{p.content}</p>
//                 {p.imageURL && (
//                   <img
//                     src={
//                       p.imageURL?.startsWith('http')
//                         ? p.imageURL
//                         : `http://localhost:5000${p.imageURL}`
//                     }
//                     alt={p.title || 'post image'}
//                     className="mt-3 rounded-md max-h-60 w-full object-cover border"
//                   />
//                 )}
//                 <p className="text-sm text-gray-500 mt-3 pt-2 border-t border-gray-100">
//                   By {p.author?.firstName} ({p.author?.email})
//                 </p>
//               </div>
//             ))}
//           </div>
//
//           {/* --- PAGINATION CONTROLS --- */}
//           {totalPage > 1 && (
//             <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
//               <button
//                 onClick={() => {
//                   fetchAllPosts(page - 1);
//                 }}
//                 disabled={page === 1}
//                 className="px-4 py-2 bg-gray-200 rounded text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
//               >
//                 Previous
//               </button>
//               <div className="text-sm text-gray-600">
//                 Page {page} of {totalPage}
//               </div>
//               <button
//                 onClick={() => {
//                   fetchAllPosts(page + 1);
//                 }}
//                 disabled={page === totalPage}
//                 className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       )}
//
//       {/* --- MY POSTS (for Approved Authors) --- */}
//       {isApprovedAuthor && (
//         <>
//           <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3 border-b pb-2">
//             My Posts
//           </h3>
//           {myPosts.length === 0 ? (
//             <p className="text-gray-500">You haven’t written any posts yet.</p>
//           ) : (
//             <div className="space-y-4">
//               {myPosts.map((p) => (
//                 <div
//                   key={p._id}
//                   className="border border-gray-200 p-4 rounded-lg bg-white"
//                 >
//                   <h4 className="text-lg font-bold text-gray-800">{p.title}</h4>
//                   <p className="text-gray-700 mt-1">{p.content}</p>
//                 </div>
//               ))}
//               {/* You would add pagination controls for "My Posts" here if needed */}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// src/pages/Blog.tsx
import { useAuth } from '../context/authContext';
import { useEffect, useState } from 'react';
import {
  createPost,
  getAllPosts,
  getMyPosts,
} from '../../services/post.service';
import { generateAIContent } from '../../services/ai.service';
import { resolveImageURL } from '../utils/image';

export default function Blog() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [error, setError] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loadingAI, setLoadingAI] = useState(false);

  const isApprovedAuthor =
    user?.role?.includes('AUTHOR') &&
    user?.approved?.toLowerCase() === 'approved';

  const isPendingAuthor =
    user?.role?.includes('AUTHOR') &&
    user?.approved?.toLowerCase() === 'pending';

  useEffect(() => {
    fetchAllPosts();
    if (isApprovedAuthor) {
      fetchMyPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllPosts = async (pageNumber = 1) => {
    try {
      const res = await getAllPosts(pageNumber, 3);
      setPosts(res.data || []);
      setTotalPage(res?.totalPages);
      setPage(pageNumber);
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Failed to fetch posts.!');
    }
  };

  const fetchMyPosts = async () => {
    try {
      const res = await getMyPosts(1, 3);
      setMyPosts(res.data || []);
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Failed to fetch my posts.!');
    }
  };

  const handleCreatePost = async () => {
    setError('');
    try {
      await createPost(form.title, form.content, form.tags, image as File);
      setForm({ title: '', content: '', tags: '' });
      setImage(null);
      await fetchAllPosts(page);
      if (isApprovedAuthor) await fetchMyPosts();
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Failed to create post.!');
    }
  };

  const handleGenerateContent = async () => {
    if (!form.title?.trim()) {
      setError('Please enter a title before generating content.');
      return;
    }
    setLoadingAI(true);
    setError('');
    try {
      const res = await generateAIContent(
        `Write a concise, helpful blog post about: ${form.title}. 
        Include a short intro, 2–3 key points, and a brief conclusion.`,
        220
      );
      setForm((prev) => ({ ...prev, content: res.data || '' }));
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to generate content.!');
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Blog</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
          {error}
        </div>
      )}

      {isPendingAuthor && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded text-yellow-700">
          You are registered as an Author but still not approved by Admin. You
          can view posts, but cannot create your own until approval.
        </div>
      )}

      {isApprovedAuthor && (
        <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Create New Post
          </h3>
          <input
            className="border border-gray-300 p-2 w-full mb-3 rounded"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <div className="flex gap-2 mb-3">
            <button
              onClick={handleGenerateContent}
              disabled={loadingAI}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {loadingAI ? 'Generating...' : 'Generate Content with AI'}
            </button>
            <span className="text-sm text-gray-500 self-center">
              Tip: enter a good title first
            </span>
          </div>
          <textarea
            className="border border-gray-300 p-2 w-full mb-3 rounded min-h-[140px]"
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={6}
          />
          <input
            className="border border-gray-300 p-2 w-full mb-3 rounded"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
          <input
            className="block w-full text-sm text-gray-600 mb-4"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
          <button
            onClick={handleCreatePost}
            className="bg-blue-600 text-white px-5 py-2 rounded font-medium hover:bg-blue-700"
          >
            Publish
          </button>
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
        All Posts
      </h3>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        <>
          <div className="space-y-4">
            {posts.map((p) => (
              <div
                key={p._id}
                className="border border-gray-200 p-4 rounded-lg bg-white"
              >
                <h4 className="text-lg font-bold text-gray-800">{p.title}</h4>
                <p className="text-gray-700 mt-1 whitespace-pre-line">
                  {p.content}
                </p>
                {p.imageURL && (
                  <img
                    src={resolveImageURL(p.imageURL)}
                    alt={p.title || 'post image'}
                    className="mt-3 rounded-md max-h-60 w-full object-cover border"
                  />
                )}
                <p className="text-sm text-gray-500 mt-3 pt-2 border-t border-gray-100">
                  By {p.author?.firstName} ({p.author?.email})
                </p>
              </div>
            ))}
          </div>

          {totalPage > 1 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => fetchAllPosts(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
              >
                Previous
              </button>
              <div className="text-sm text-gray-600">
                Page {page} of {totalPage}
              </div>
              <button
                onClick={() => fetchAllPosts(page + 1)}
                disabled={page === totalPage}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {isApprovedAuthor && (
        <>
          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3 border-b pb-2">
            My Posts
          </h3>
          {myPosts.length === 0 ? (
            <p className="text-gray-500">You haven’t written any posts yet.</p>
          ) : (
            <div className="space-y-4">
              {myPosts.map((p) => (
                <div
                  key={p._id}
                  className="border border-gray-200 p-4 rounded-lg bg-white"
                >
                  <h4 className="text-lg font-bold text-gray-800">{p.title}</h4>
                  <p className="text-gray-700 mt-1 whitespace-pre-line">
                    {p.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
