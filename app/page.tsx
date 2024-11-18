import BoxAndUrl from "@/components/box-and-url";
import insertIntoDB from "@/lib/insertIntoDB";

export default function Home() {
    return (
        <main>
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "2rem",
                    color: "rgb(109,135,244)",
                    paddingTop: "10px",
                }}
            >
                Input your alias and link here!
            </h1>
            <BoxAndUrl createFunc={insertIntoDB}/>
        </main>
    );
}
