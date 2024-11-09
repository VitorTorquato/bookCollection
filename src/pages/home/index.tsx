import { Cards } from "../../components/cards";
import { Container } from "../../components/container";

export function Home(){
    return(

        <Container>
            <main className="w-full pb-16 px-2">
                <section className="w-full">
                <h1 className="text-2xl text-black text-center mb-8">Best Sellers</h1>
                    
                    <div
                    className="w-full mt-0 mx-auto grid gap-2 grid-cols-2 md:grid-flow-col-3 lg:grid-cols-5"
                    >   
                    <Cards/>
                    <Cards/>
                    <Cards/>
                    <Cards/>
                    <Cards/>
                    <Cards/>
                    <Cards/>

                    </div>
                </section>
            </main>
        </Container>
            
        
    )
}