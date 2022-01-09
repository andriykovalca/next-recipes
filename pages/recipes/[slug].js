import Head from 'next/head'
import styles from '../../styles/RecipeDetails.module.css'
import { createClient } from 'contentful'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from "next/link";

const client = createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_TOKEN,
})

const printDocument = () => {
    window.print();
}

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: 'recipe'
    })

    const paths = res.items.map(item => {
        return {
            params: { slug: item.fields.slug }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {

    const { items } = await client.getEntries({
        content_type: 'recipe', 
        'fields.slug': params.slug
    })

    return {
        props: { recipe: items[0]}
    }

}

export default function RecipeDetails({ recipe }) {
    const { image, title, cookTime, prepTime, directions, ingredients} = recipe.fields
    console.log(directions)
    return (
        <div>
            <Head>
				{<title>{title} - Next Recipes</title>}
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
            <main>
                <div className={styles.container}>
                    <Link className="noprint" href="/"><a>Back</a></Link>
                    <button onClick={printDocument}>Print recipe</button>
                    <div className='banner'>
                        <Image 
                            className={styles.bannerImage}
                            src={'https:' + image.fields.file.url}
                            width={820}
                            height={400}
                            alt={title}
                        />
                    </div>
                    <div>
                        <h1 className={styles.heading}>{title} recipe</h1>
                        <div className={styles.information}>
                            <div className={styles.ingredients}>
                                <h2>Ingredients</h2>
                                <div className={styles.ingredientsContainer}>

                                <table className={styles.ingredient}>
                                    {ingredients.map(ingredient => (
                                        <tr key={ingredient.id}>
                                            <td>{ingredient.key}</td>
                                            <td>{ingredient.value}</td>
                                        </tr>
                                    ))}
                                    
                                </table>

                                </div>
                            </div>
                            <div className={styles.timeContainer}>
                                <h2>Time</h2>
                                <div className={styles.time}>
                                    <div>Prep time:</div> <span> {prepTime} minutes</span>
                                </div>
                                <div className={styles.time}>
                                    <div>Cook time:</div> <span>{cookTime} minutes</span>
                                </div>
                                <div className={styles.time}>
                                    <div>Total: </div> <span>{prepTime + cookTime} minutes</span>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className={styles.directions}>
                            <h2>Directions</h2>
                            <div className={styles.directionsContainer}>
                                {documentToReactComponents(directions)}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}