import Blogs from './pages/Blogs';
import Resources from './pages/Resources';

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/qna" element={<QnA />} />
  <Route path="/blogs" element={<Blogs />} />
  <Route path="/resources" element={<Resources />} />
</Routes>
