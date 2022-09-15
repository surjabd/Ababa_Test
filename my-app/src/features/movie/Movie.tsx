import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import styles from './Movie.module.css';
import DataTable, { TableColumn } from 'react-data-table-component';
import { selectUserLoginInfo } from '../login/loginSlice';
import { moviesStore, getAllMoviesAsync,saveMovieAsync } from './movieSlice';
import Modal from 'react-modal';

interface DataRow {
  name: string;
  director: string;
  actor: string;
}

export function Movie() {
  const userLoginStore = useAppSelector(selectUserLoginInfo);
  const movieStore = useAppSelector(moviesStore)
  const dispatch = useAppDispatch();
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10);
  const [sortKey, setSortKey] = useState('name')
  const [sortOrder, setSortOrder] = useState('ASC')
  const [movieList, setMovieList] = useState([])
  const [firstRender, setFirstRender] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [movieData, setMovieData] = useState({
    name: '',
    director: '',
    actor: ''
  })
  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Director',
      selector: row => row.director,
      sortable: true,
    },
    {
      name: 'Actor',
      selector: row => row.actor,
      sortable: true,
    },
  ];
  const customStyles = {
    content: {
      top: '45%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      minWidth: '20vw',
      minHeight: '20vh',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const getMovies = async ({
    name = searchText, page = currentPage, limit = perPage, srtKey = sortKey, sort = sortOrder
  }
  ) => {
    const getAllMoviesOptions = {
      page: page,
      limit: limit,
      sortKey: srtKey,
      sort: sort,
      name: name
    }
    const result = await dispatch(getAllMoviesAsync(getAllMoviesOptions))
    console.log("GetMovies", result)
    if (result.type === 'movies/fulfilled') {
      setSortKey(srtKey)
      setSortOrder(sort)
      setCurrentPage(result.payload.meta.currentPage)
      setPerPage(result.payload.meta.itemsPerPage)
      setTotalRows(result.payload.meta.totalItems)
      setMovieList(result.payload.items)
      setFirstRender(false)
    }
  }

  const handleSort = async (column: object, sortDirection: string) => {
    const sortKey: string = column['name' as keyof typeof column]
    if (sortKey) {
      getMovies({
        srtKey: sortKey.toLowerCase(),
        sort: sortDirection.toUpperCase()
      })
    }

  }
  const handlePageChange = async (page: number) => {
    // page = (page - 1) * perPage
    console.log(page);
    if (!firstRender) {
      getMovies({ page: page })
    }
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    console.log(newPerPage, page)
    if (!firstRender) {
      getMovies({ limit: newPerPage, page: page })
    }
  }


  const handleMovieSubmit = async(mData=movieData)=>{
    if(movieData.name==='' || movieData.director ===''|| movieData.actor===''){
      alert('Please enter all required field')
    }else{
      
      const formData = new FormData();
      formData.append('name', movieData.name)
      formData.append('director', movieData.director)
      formData.append('actor', movieData.actor)
      console.log(movieData,formData)
      const result = await dispatch(saveMovieAsync(movieData))
      if(result.type==='movies/fulfilled'){
          getMovies({page: currentPage})
          setModalIsOpen(false)
          setMovieData({
            name: '',
            director: '',
            actor: ''
          })
      }else{
        alert("Could not save movie")
      }
    }
    

  }

  useEffect(() => {
    getMovies({ page: 1 })
  }, [dispatch]);



  return (

    <div className={styles.content}>
      <div className={styles.header}>
        <div>Movie Database</div>
        <div className={styles.row}>
          <div>{`Welcome ${userLoginStore.loginInfo.name}`}</div>
          <button
            className={styles.button}
            aria-label="Logout User"
            onClick={() => {
            }
            }
          >
            Log Out
          </button>
        </div>


      </div>
      <br />
      <div className={styles.header}>
        <div>
          <input placeholder="Search Movie" className={styles.textInput} type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
          <button
            className={styles.button}
            aria-label="Search"
            onClick={e => getMovies({ name: searchText })}
          >
            Search
          </button>
        </div>
        <button
          className={styles.button}
          aria-label="Add New Movie"
          onClick={e => setModalIsOpen(true)}
        >
          Add New Movie
        </button>
      </div>
      <DataTable
        columns={columns}
        data={movieList}
        sortServer
        onSort={handleSort}
        persistTableHead
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={e => setModalIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Add New Movie"
      >
        <div>
          <div className={styles.header}>
            Add New Movie
          </div>
          <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
              <label style={{ marginRight: '5px' }} >Name<span style={{ color: 'red' }}>*</span></label>
              <input className={styles.textInput} type="text" value={movieData.name} onChange={e => setMovieData({ ...movieData, name: e.target.value })} />
            </div>
            <div className={styles.formWrapper}>
              <label style={{ marginRight: '5px' }} >Director<span style={{ color: 'red' }}>*</span></label>
              <input className={styles.textInput} type="text" value={movieData.director} onChange={e => setMovieData({ ...movieData, director: e.target.value })} />

            </div>
            <div className={styles.formWrapper}>
              <label style={{ marginRight: '5px' }} >Actor<span style={{ color: 'red' }}>*</span></label>
              <input className={styles.textInput} type="text" value={movieData.actor} onChange={e => setMovieData({ ...movieData, actor: e.target.value })} />

            </div>

          </div>
          <div className={styles.modalFooter}>
            <button
              className={styles.button}
              style={{marginRight:'10px'}}
              aria-label="Cancel"
              onClick={e => setModalIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className={styles.button}
              aria-label="Save"
              onClick={e => handleMovieSubmit()}
            >
              Save
            </button>
          </div>
        </div>

      </Modal>
    </div >
  );
}
