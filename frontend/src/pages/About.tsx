import "./About.css";
import me from "../assets/IMG_0078.jpeg";

export default function AboutPage() {
  return (
    <section>
      <img src={me} alt="my image" />
      <p>My name is Danyil</p>
      <p>I'm from Ukraine</p>
      <p>I'm 26 y.o.</p>
      <p>Living in Czech Republic almost 10 year</p>
      <p>I'm a DevOps Engineer at Vendavo</p>
      <p>
        I graduated with a Bachelor's degree in Computer Science from VSB-TUO
      </p>
    </section>
  );
}
