import Head from 'next/head'
import styles from '../../styles/RecipeDetails.module.css'
import { createClient } from 'contentful'

const client = createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_TOKEN,
})

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
    console.log(recipe)
    return (
        <div>
            <Head>
				{/* <title>{title} - Next Recipes</title> */}
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
            <main>
                <div className={styles.container}>
                    Recipe details
                </div>
            </main>
        </div>
    )
}