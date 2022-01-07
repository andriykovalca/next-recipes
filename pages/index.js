// import Head from 'next/head'
import Image from 'next/image'
// import React from 'react'
// import styles from '../styles/Home.module.css'
// import Link from "next/link";
import { createClient } from 'contentful'

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
        <div className="container">
            <main>
            <h1>Recipes</h1>
            {recipes.map(recipe => (
                <ul key={recipe.sys.id}>
                    <li>
                        <Image width={200} height={200} alt={recipe.fields.title} src={"https:" + recipe.fields.image.fields.file.url} />
                        <h2>{recipe.fields.title}</h2>
                        <div>
                            <span>Prep time:</span> <span>{recipe.fields.prepTime} minutes</span>
                        </div>
                        <div>
                            <span>Cook time:</span> <span>{recipe.fields.cookTime} minutes</span>
                        </div>
                    </li>
                </ul>
            ))}
            </main>
        </div>
  )
}

