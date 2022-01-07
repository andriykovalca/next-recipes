import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function RecipeCard({ recipe }) {
    const { title, prepTime, cookTime, image, slug } = recipe.fields
    return (
        <li className={styles.singleRecipe} key={recipe.sys.id}>
            <Image className={styles.thumb} width={250} height={250} alt={recipe.fields.title} src={"https:" + image.fields.file.url} />
            <h2>{title}</h2>
            <div>
                <span>Prep time:</span> <span>{prepTime} minutes</span>
            </div>
            <div>
                <span>Cook time:</span> <span>{cookTime} minutes</span>
            </div>
            <div>
                <Link href={'/recipes/' + slug}><a>Read more</a></Link>
            </div>
            
        </li>
    )
}