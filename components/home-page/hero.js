import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src="/images/site/mise.jpeg" alt="mise" width={300} height={300} />
            </div>
            <h1>Hi, I`m kane</h1>
            <p>My blog</p>
        </section>
    );
}

export default Hero;
