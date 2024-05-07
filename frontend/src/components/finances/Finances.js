import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal';


const Finance = (props) => {
    return ( 
        <div id={props.title} className='flex-1 border-2 border-slate-500 rounded-md p-2'>
            <div className='flex'>
                <p className=''>{ props.title }</p>
                <Modal title={props.header} body={props.form} trigger={<FontAwesomeIcon icon={faPlus}/>}/>
            </div>
            <p className='text-3xl text-orange-700'>{ props.value }</p>
        </div>
     );
}
 
export default Finance;