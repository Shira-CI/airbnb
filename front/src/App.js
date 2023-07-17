import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { StayDetails } from './pages/StayDetails'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { StayIndex } from './pages/StayIndex'
import { store } from './store/store'
import { StayEdit } from './pages/StayEdit'
import { UserMsg } from './cmps/user/user-msg'
import { Wishlist } from './cmps/user/WishList'
import { Book } from './pages/Book'
import '../src/assets/styles/main.scss'
import { MyTrips } from './pages/MyTrips'
import { MyRents } from './pages/MyRents'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout">
          <AppHeader />
          <main className="main-app">
            <Routes>
              <Route path="/" element={<StayIndex />} />
              <Route path="/edit/:stayId" element={<StayEdit />} />
              <Route path="/stay/:stayId" element={<StayDetails />} />
              <Route path='/trip' element={<MyTrips />}/>
              <Route path='/rent' element={<MyRents />}/>
              <Route path='/wishlist' element={<Wishlist />} />
              {/* <Route path='/book/:stayId' element ={<BookStay/>} /> */}
              <Route path="/book/:stayId" element={<Book />} />
            </Routes>
          </main>
          <AppFooter />
          {/* <UserMsg /> */}
        </section>
      </Router>
    </Provider>
  )
}

export default App
