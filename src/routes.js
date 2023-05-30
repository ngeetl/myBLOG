import Board from './pages/Board';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Edit from './pages/Edit';
import ShowPost from './pages/ShowPost';
import Admin from './pages/Admin';

export default [
  {
    path: "/",
    component: <Home/>
  },
  {
    path: "/board",
    component: <Board/>
  },
  {
    path: "/admin",
    component: <Admin/>
  },
  {
    path: "/blog",
    component: <Blog/>
  },
  {
    path: "/blog/:id",
    component: <ShowPost/>
  },
  {
    path: "/blog/:id/edit",
    component: <Edit/>
  },
]