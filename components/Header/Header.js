import styles from '../../styles/Nav.module.css'
import Link from 'next/link'
import { FaRegClock } from 'react-icons/fa';
import Image from 'next/image';
import Logo from '../Header/nextRecipesLogo.png'

export default function Header () {
    return (
        <nav>
            <div className={styles.container}>
                <Image alt="Next Recipes logo" src={Logo} width={150} height={60} />
            </div>
            <ul>
            <li>Home</li>
            
            
            <li>Categories
                <ul> 
                <li>123</li>
                <li>123</li>
                <li>123</li>
                </ul>
            </li>
            <li>Submit recipe</li>
            </ul>
        </nav>
    )
}