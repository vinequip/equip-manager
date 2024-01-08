import { useParams } from 'react-router-dom';
import useWorkers from '../../hooks/useWorkers';
import Loader from '../../components/Loader/Loader';


function EditChair() {
    const { id } = useParams();
    const workers = useWorkers();
    console.log('WORKER ---> ', workers)


  return (
    <>
    <div className='holder'>
      ID ---- {id}
    </div>
    {!workers && <Loader/>}
    </>
  )
}

export default EditChair
