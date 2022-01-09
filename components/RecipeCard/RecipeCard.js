import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegClock } from 'react-icons/fa';


export default function RecipeCard({ recipe }) {
    const { title, prepTime, cookTime, image, slug } = recipe.fields
    return (
        <li className={styles.singleRecipe} key={recipe.sys.id}>
            <div>
                <Image className={styles.thumb} width={300} height={300} alt={recipe.fields.title} src={"https:" + image.fields.file.url} />
            </div>
            <div className={styles.recipeInfo}>
                <h2>{title}</h2>
                <div>
                    <FaRegClock /> <span>{prepTime + cookTime} minutes</span>
                </div>
                <div>
                    <Link href={'/recipes/' + slug}><a className={styles.readMore} >Read more</a></Link>
                </div>
            </div>
           
            
        </li>
    )
}