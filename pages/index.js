import Head from 'next/head'
import Image from 'next/image'
// import React from 'react'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import { createClient } from 'contentful'
import RecipeCard from '../components/RecipeCard/RecipeCard';

export async function getStaticProps() {
    
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE,
        accessToken: process.env.CONTENTFUL_TOKEN,
    })

    const res = await client.getEntries({ content_type: 'recipe' })

    return {
        props: {
            recipes: res.items
        }
    }
}

export default function Home({ recipes }) {
    console.log(recipes[0])

    return (
		<div>
			<Head>
				<title>Next Recipes - Home</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className={styles.container}>
				<main>
					<h1>Recipes</h1>
					<ul className={styles.recipeList} >
						{recipes.map(recipe => (
						
						<RecipeCard key={recipe.sys.id} recipe={recipe}/>
						
						
						))}
					</ul>
				</main>
			</div>
		</div>
        
  )
}

<Head />