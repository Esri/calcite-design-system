import { select, text } from "../../../.storybook/fake-knobs";
import { iconNames, boolean } from "../../../.storybook/helpers";
import { createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Tiles/Tile",
};

export const simple = (): string => html`
  <calcite-tile
    ${boolean("active", false)}
    description="${text(
      "description",
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.",
    )}"
    ${boolean("disabled", false)}
    heading="${text("heading", "Tile heading lorem ipsum")}"
    ${boolean("hidden", false)}
    href="${text("href", "#")}"
    icon="${select("icon", iconNames, "layer")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  >
  </calcite-tile>
`;

export const allVariants = (): string => html`
  <style>
    .parent {
      display: flex;
      color: var(--calcite-color-text-3);
      font-family: var(--calcite-sans-family);
      font-size: var(--calcite-font-size-0);
      font-weight: var(--calcite-font-weight-medium);
    }

    .child {
      display: inline-flex;
      flex-direction: column;
      flex: 0 1 50%;
      padding: 15px;
    }

    .right-aligned-text {
      text-align: right;
      flex: 0 0 21%;
    }

    hr {
      margin: 25px 0;
      border-top: 1px solid var(--calcite-color-border-2);
    }
    calcite-chip.new {
      background-color: #d8efda;
      color: #13631f;
    }
  </style>
  <div class="parent">
    <div class="child right-aligned-text">scale</div>
    <div class="child">small</div>
    <div class="child">medium</div>
    <div class="child">large</div>
  </div>

  <!-- heading only -->
  <div class="parent">
    <div class="child right-aligned-text">heading only</div>

    <div class="child">
      <calcite-tile heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- heading only with link -->
  <div class="parent">
    <div class="child right-aligned-text">heading only with link</div>

    <div class="child">
      <calcite-tile href="/" heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile href="/" heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile href="/" heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- basic -->
  <div class="parent">
    <div class="child right-aligned-text">basic</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>

  <!-- link -->
  <div class="parent">
    <div class="child right-aligned-text">link</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>

  <!-- large visual -->
  <div class="parent">
    <div class="child right-aligned-text">large visual</div>

    <div class="child">
      <calcite-tile icon="layers" heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile icon="layers" heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile icon="layers" heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- link large visual -->
  <div class="parent">
    <div class="child right-aligned-text">link large visual</div>

    <div class="child">
      <calcite-tile href="/" icon="layers" heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile href="/" icon="layers" heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile href="/" icon="layers" heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- content-top slot -->
  <div class="parent">
    <div class="child right-aligned-text">content-top slot</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-top">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- content-bottom slot -->
  <div class="parent">
    <div class="child right-aligned-text">content-bottom slot</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-top slot -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-top slot</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-top">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-bottom slot -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-bottom slot</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- only content-top slot -->
  <div class="parent">
    <div class="child right-aligned-text">only content-top slot</div>

    <div class="child">
      <calcite-tile scale="s">
        <img
          src="data:image/jpeg;base64,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"
          slot="content-top"
        />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="m">
        <img
          src="data:image/jpeg;base64,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"
          slot="content-top"
        />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="l">
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUREhgREhUYGBgYGBgSGBIREhEYERERGBgZGRkYGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHzQrJSs0NDQ0NDQ0NDQxNTE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQ2NDQ0NDQ0NDQ0NDQ0NP/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIEBQYDBwj/xAA9EAACAQIEAwYCCAUDBQEAAAABAgADEQQFEiExQVEGEyJhcYEykRQjQlJiobHRBxXB4fAzcqJDgrLi8Rb/xAAaAQACAwEBAAAAAAAAAAAAAAAAAQIEBQMG/8QAKBEAAgIBAwQBBQADAAAAAAAAAAECEQMEEiETMUFRIgUUcZGxYYGh/9oADAMBAAIRAxEAPwCbCEDN08sJFhCMiEIQEACEIQAIsIQASEWBgAkIoEIwCEIARAESLCMAtAiEIAELQhAAhCECQQtCECIQgYWgAWhCFoAAhCERIIQhGRCEIQJBCEWIVDYtoWhEOghC0LQAIWhCMVBCELQCgtCLC0BiQi2hAVCQixbQChsItosAobaLFtFAhY6GQnZaRM708L1kXJInHFKRDihZa08KvSUnbTEvhqKd2PE7lNuPDkeRnKeojCLZZx6KU5JWSloMeUBQboZT9hs0rvXbD4okhkLoW460Iut/9rXt+Ezf9wOk4w1anG0d5fT9j2tmXFBukccK/SXuOq0qCF6jBVHW12PRRzM55VmNLFKzU2vpNiDxF+B/zpJfcc0L7JeWUfct90/KI1NhxE1ndDpOT4URrUf4IvRKu5lrQmibBL0/KNbAg8h8pProg9HL2Z+JL4YBfu/lHfQF6CHXiL7SXsoLQAl+mXbzr/L7conniNaORnQseFl82CB2nMZXeProPtJLsVCoI+wk98utzMZ/LvMxb4+w6M14KiFototp3KlCWhaLaEAGiLaLaFoCoSFo4CAEAobaAjoWgFCQtFtC0AEhaLaLABsUCLaPWwibJRjY1aZMkpR6zmass8op6wSfScsknFWWcMIyltRGSnyllQy8kDaPxuIp4VBUqA2LBQFUFibE9QOAMbhu1OFYgF2S+31iMB8xcCUZ6mKdWaePTOrokDLiOc54nK1qLoqLcXDC4F1YcCOhl3SdHUMjKyncMpBUjyI4xSRyE5yluVPszrGO12jy3tBT+iYinUJ0hX7wEceO+3MFQZ6QtAHcbg7gjgRMb27wIqOl7AXZrD7WkAb/AKTnlfalsElNKiM9DSFVk3q0dItpAJ8agW2vcb8dhM/T5Y4pODfkv5sbyRU16D+IWXmpUpKGtZG8PLc8f+P5RP4aZOKNOu5Ys7uqm/wqircAD1Zt/SZ7OO1r4zFGolFhRQBF1i1TSLksxBtvc7C+02vYCp3lOu4BC61UarXJ0hja3KzCdITk8z9EJwisK9l46WjEoM3CThQ1nfYSaulBbaXXOiko2VyZceLGdlwi9ZIOIB5zmao5RWyW1HJ8DfgY3+XrzM7NUPWAfrC2G1C08Oqj+piPhVO8TvY1mvzitjpCHDJ0nQ0xbYRI1mhuDaji+GvyjPovpJGqJqMe5i2IwNoR0S02DzokLR1oWgFDYsW0WAUNtC0dC0AobaFo60IBQloRYtoBQ2Fo60IBQloRZ3w2GLtblIykkrZKEHJ0jnRw7ObCabAYXQoEZg8KE2AlpSUTPzZ93C7Gxp9Osat9yp7T4TXg6h5oBUH/AGnxf8S08S7VVNIWolRlbgFDEahz28rz6HdQylGFwwKkdVIsRPD+2/Z56Z7o2upLIzDZ6fIg+4v0Mz8kfmpGhB/Fo0P8J8zZQaFZywca1J4K4uSPcf8AiJu8xzcqjHDrrKqWdmDAIlibhSLtw25evCeE5RjatKoEYlWUbMvwso5XG09J7O589Z0pOC5J2qFyCngte1iDYC/nI7pJNIlti3bLrNFWoqgEuUXxOUI11PiLADqbn3Ey9Vk0fWHZWZlQhbgmw3/v1mkzys4ph8O9jezE7Ar1HQbcplVwuu5ICvfqDt18vXzlGcKk2y1CXxo5pktHVqUkE7lFK6QDxBuPyln2JzdMJimwlRjprfA7EaVqIDYH/cu1+qgTlh00KRxPEXvc7Ha55zGdoS9OtTqA2s4II+y4JIF/kfadMEnusM0U40e8jMqXKrT6bVE49OMa7atwbjkRwM8DwSVCSajggkmxA8Ivwvzm97C5S/eCsl0pqTqtdRUa3w6efK9+HrLyytuqKLxpK7N4Ej1Fp10iNInWznQ0CBjlFo68BnICPURbiF4ABiAQLQgA6wiWES0baAGGtFtCE2TzYWhaFosAEhaLC0AoS0LRYQAS0LRYsAG2haOhaACWhFj0osxsBxg3RJRb4RzEt8upMRqttLHKsnVfE25/IS5GGAFgLSlmzp/FGlp9M4/KRWUjaSVaLi0RNywHkSBeZDNs/YsadLh8JY3Bv5HlKGXLGCtmnjxSk6RpcVmdOl/qOB+/KZDtFm/0ldLLZAbhTuSeR8pyTDJQtWxeqxuVQk66p48Psr1Jt/WW2TZpQxbtfDqiUxr1m2lTccRYXPlvwlKWWWTi6Rajjjj5qzN512Z0Ukq01Asmuoh4r+PfjsRfpKjJ2qrUtS2cglCR4b2tY+t7e89X79HdWBGlgTc8GHSZellbNmhxQKlVRm7oMPC2nQht6Kh8tUkqjxZDmXg84zzt9jK6NQrJTC30nTTZSGH4tWxG/CRcixmINt207EFrm3oeHtPW827JYavU77uULML7ixDdSOs50cjWgtr6r8gBpFvWTyNbeUKCe7hkDDZZ3tMsXCs1n1EkW3uwufW3tMnnGVP3bBxdrd5vyJ4b8tp6HRwwBTYXZhquAVCcbWtbex+cMVhlro1VFCtqKm9rVQLgDfyvKkXXKLL54Z5pk2hqtFKz2V2UMQV1Xa3C+wP7z27D0lpotOmAEUWUDgBPPMhyGmuYpUKpYq31VVFJLAE3psd1YcbcCL8CN/TNAAsB8poYacbRSzWpURyYoi6IoWdjkAWGmLpi2gAy0dpi2gRABNMLRLxO8gA68I3vId7EBh4totoWm0edEhHQgIbCOhAY20dCFoCoS0WEW0BiQAvsISfllC7XI2kJyUVZ0x43OSSOuDy0MLtLijhFFrCdaSXnTE4hKK6qjBR+I8TM7Jlk+WzYx4IxVJEiktpVZ32kSgtkYFiNrbrMxnXat6n1dHb7J4HUOqkGVWWZY9Ql6jBVHxu5IUf+3HYTNzamuI/s0cWn8y/RLq4mrjG1ubKN9zZUHP2i4HMKVGsiIofUwXW97LcgagP3/KMzavQVNFKqzeQUqGbfcnnv5c5lkazgC5Y/MSkm5Oy3SUaND2ywlR8TqsSrBVUi5BP3fW9zbzhmVdcDhFwoPjYCrUII2JsFT2H+bzUYKoWVKVYgVCmu3FrcAT0ax395kMf2Zr1ncupcXFyhBLHiB1nejhfgl9ki+LwjXYoE1IX320urNbz0k/KWOboKaV6oDaGpKA9randgwsfKyj1AkzBYJcuy96ZAvZ6jBTzYk2B6zO18/WtSV6NTxImh6bWKOl/uHYnqISjyKLNJl+cWpUqjeLUppsxJsXSwNjz5787GWuKsfFfYgWItbeZjJ8VWZaOsApURV7nTpRLAbLtYEW1X57+1umNopaiWJ08GtcNtwFr9I1J00xOKu0dqdDSNV77g87cb/vIfaHAGuqLTdUAuxVr7sbb7cekk4fOsOzGmWC23s23O2/Scs5ol6iPTtf4SV5De368PORa+Nkk/lRUZvldWklNke7ggpW8K+JbEeFm5WmnyLPFxdMXslVR46W91PDUoO5Q8j7HeZPOMLUxCLRrhkKMTSrU9RZQwI4WN+J2PEX4cZB+j4jDUkdGR3QsrMuoMDuB8ViAQFNuRuN+M6Ysqj5IZMbl3PS3eN72QMNjO9ppUsV1or6TxXUAbH0jmqTQKZN72BrSvNWNNSFAS3xUauKkItGgwoVlia85tWkbVGM0KESTWid9Il4t4UOymtC0daOCTYujAUW+wy0J1FOIySO9EulKjnCdAkCke5B05HO0LR+mFo7RFxaGwtFtHAQsErOuGp3PCX2DogCVFBwu5lNnfazQDToMNXAsbgX8v3mdqsqjy2a+jwuSpI1edZ7TwdO5GpiPCg5zzDNe0lbFvv8JPwC4A9JCNSriX0tqYseVyb+n7Sx+ifRxY2L8+FkPTzMxs2dydeDaxYVH8k3s/l+uoqu1g32W42/X9Jou1+HIFNV2pqpAC3+IcSfymVwFYqwdt7ENY8Njzm4+krjcMb+HkTYbOLbjjtvKy5tHWXDTPPcTTF7KJp8hydMMhxuJHAXp0z8TNyax/L5yRl+TpTq94Dr0cAQunVyPr/nKVmeviHZnrXAFwgv4Au4Gn5bya+KIt7nSIX87Za7YgnxXJA257EfI2muo5sKeF78AXIBsb6dTWHvY/pPIcRiiaoA4Xt7zT4vFmpghRp3Zl8BsLljquAtuPED2nWNo5SSZ3x/aZ8ZU+jjnZdviZztYAcby67O/w5CN3tdmQNv3C2v6M3Aeg38xJvYLsmMCnf1gDXccOIoofsj8XU+w532LV5ahh8v8ARXnlriJxbJaHdikqhFHAJw9wbhvU7zN43sUoOuiQbbhDVroOthYsP0E1H0iKMSJ0lii/BzWSS8mHGExNAnRgEOriddN9XzN7es70aOJRdZo9yU8f1dRSpFrG9O5HDlNc1QGc3aR6Ea7sfWfooqXaCmwVKzIGbZXQ2R25Ag7q23A3B68pnO0OcFFKAC5uvoetveWGe9i6WJJKO1Mk72AZTxOwPDcyKvYu6KtTEOxUAamRdRXof7yrLSybssRzxSLbsxiDUwiEm5W6H2O35ESyaccBhEw9MUqd7DmxuzE8SZIM0YRaikylNpybRxaNnfTE0x0IYojisWBjoBoEXTGlod5HtFaHaYaZzNWJ30exi3IrQs6KI2KGl12zNjtidAsXTOeuLrkdrOm+I4rG6YmuKGj2sW+I3TE0x94auZ5bx0yNxbobonHFYlKQ1ObcgOp6SmzbtMqeCjZm+8fhHp1mcOJfEkknc8RdtJI8pQz66MLUeX/w0cH09yqU+F68krOM/er4FFl5oCbn1PGV2Gy56vi4LfcsfCo/W/6y1wPZ5wblHcHgArG/qbSdisBUU6ag02Fwmw2PkPT1mNkzOTtu2bMMcYJRiqRf9jloUyURTrsfrXtv+FRy5/5tK/tTh+7qsQvhbxAgG1+Yv1kbLsaaBDjiOXC/9pKTtJUqOqlUYFh4Sm9722nHv3JNU7RWZXlr12vYqnNzfSFG53tx4S8zHFU1w5o0G56PxH754c729507T4vSi00PG5YC2nSOXzI+Ux1PFePj6yfIu5c5XinpONJKgsLrybc8RLX+IWKthhRpjU+q5sLsFPG1vaYrFZppOx3HCx5iXGGzenU8VQE1CNVifCd+RHtJxT8kJd+DBGmbg8/znrfYHs+cNSFeuPG/iRG/6akbEj7x/KV/Z/J0ar9KqIBuSotszdbcAP1/XZNihNHDglJKUl+ChmzxTcU/yTXrTk1WQziRGNXEtdNlbqRJZqxpqyGa0Q1Y9jF1Ik3vojV5BNSMNSHTYdRE81pzerIJcxpcySxsi8qRLNSKKshXMW5k1ibObzJE3vo015DvC8l0SPXJffRDWkW8I+khPOdjVjC8aISSgkQc5MNcNULQjpEd0vYyEIWnYrWEIWigQENtHARr1FTZmA6XIF5S5jnCuhWg9nHPmPY/qP7Thl1EMatv/RawaXJldJceywx2a0aH+o4B+79o+0z2Y58ao+q1IByYgavcTNYlHrVDquX534n0lhgsAtI+M3526HzmNn105qk6Ru6fQY8TurftnbA5VUxLAIh1NxG2k+eobD8pdJhqeBfQAtSoOJcakRiOCjmR1Py5yxwmYLhsMVp7VHPI30Lyt0P+GU9GmSdZ3ubkniTx4zMlOzQjHnk32SYmpUomrVA5ldI3KjjtfqLe0xmPxRcljuSTcniTNdlNS+FUHoy+1z0mQzLLqiljpOgE2sQSVvtt1g1aRCPDZS4nE2BAuSfS0m9nsK71A9rKpuWttfpfrJGEyIsO9qnSg8Wk31MvO+/hEnnN0p2p0lGhdrm9vO3z4zpwkDtsZnuCqMmsKdKi1730gnif85zz/G1mDFQbHmbcNv7z1DM8/RqSpStcgXHNTzvMFmmW3BqIOZLDrzvOkaTs5tuqM4KpBvv6mafshlL4mp3z37tNtXDW33V/rIvZ/s82MqXa60kPjccWP3F8/Pl8p6ZRpKiKlNQqqNKqo2UCael0qyfKXb+mZq9Z0/hHv/B42FhsBsAOAEQmEDNXaY+7gNULxIsdC3MSLCEGgUqC8SLCG0e4S0W0ISO0mpCWi2jo2FBYWhaLaFoUK2JaEW0LQodsSFotokKDcFoWjoQC0c7RQsqH7R0bHQGbb7trHzkL/wDRO90CaG4hvL0Mqz1+GPZ2WYfTM0u6ovamLRDpLC/C197nhKbMc+ZQVpoVO4DnexHUekg1MK9U6vtqOXxEHp+0Z9FFP/VbX+EfGByB+76GZuf6hOfEXRq4Pp2KHMlbKeu1XEVNRuW4WudN/LpLHA0CPDWAJ5cNan+nvB8afhRQo6i2o+ptLXK8nupr4kslIb/jqG/BRx9//oz5zb7l9JIum7NU2RTTYA28TtYgKRe4I3PLa8z+IwwpsU+IjbURa3oOXvv6S/wfaLS4QKBSFlCksXC9dRO58pKzTIBUOujpAP2bnc9QeE51Y1KnyZFSSbdfzl9leVa11ubIN783txA8usTCZI5e9QFFHpdt7WHTnvOXaDOCPqadgo8JtbfyHQRpA5eEGN7RsraaQUIBYAAbqP0/tO+W5mcTUCslj8QNwVUATJAamJ4/1ml7Koe8G1hpYHr1J/ISdEXVDu1rvTVRwRt9vtsOR9NvnMPisz0Lb7R5TW9t8YKilV4oCQdRsAbX/Keb1VPEn3M6xim+SDk6JdDFuG16t7/Py85rckptjB0C7Ow4DoB5kTL5FlT4ur3dPZRYvUI8KJ/UnkOfzM9VwODShTWlTFlX5sebMeZMv6bR9R3Lt/TO1erWNbY9/wCDsNh0pItOmoVVFgo5fued46OMJtKNKkYTlbtjYQjrRkRsLR1oQsdDYR1oWgFMbCOtC0YhsdCFoqJJhCLaFohphC0WERO0NhHERpjSIN0NjoQtCg3BCFotoUFs8/wWAKb1CE2+2SG9lAvNHl2EoujO7Ahb2FgGcgX8Nzf8okJ42UmeziuCOM8KONCgKthpIBJHMEnfrwtL3E5VSxdPXTIUniV3GviQw8vKEIvIS4REweEwmFb6wmo63uQvgv0seJH9ZW57j2rvq3CjgpPAenC8ISSEiGhtbrL7J8TWYhEayfaBsQq33tfnx+cIQ8g+xMzrM9A0KN2BAO1lG1yBMbXpHVf9YQkhLsdsJhbnc8OMTM89FJe7omzbi4O/Lbb0hCOPL5B9jlhH72n3jfavf/dzIlBSympXr9xTF992N9KJ95ughCWsEVKaTK2aTjFtej03KMsTCUhSpjzZz8VR+bN+3IbSZCE9JGKjHg8s5OTcmEIQjEEIQgARYQgNMcqx5SEJyfcsR7HMrGlYsJKJzlFBaFoQkyDQWiQhBEQiwhAEELQhESYmmLaEIwaQWiWhCMif/9k="
          slot="content-top"
        />
      </calcite-tile>
    </div>
  </div>

  <!-- content-start slot -->
  <div class="parent">
    <div class="child right-aligned-text">content-start slot (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-start slot -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-start slot (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- content-end slot -->
  <div class="parent">
    <div class="child right-aligned-text">content-end slot (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-end slot -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-end slot (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- content-start & content-end slots -->
  <div class="parent">
    <div class="child right-aligned-text">content-start & content-end slots (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-start" icon="banana"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-start & content-end slots -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-start & content-end slots (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-start" icon="banana"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <hr />

  <!-- heading only centered -->
  <div class="parent">
    <div class="child right-aligned-text">heading only centered</div>

    <div class="child">
      <calcite-tile alignment="center" heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile alignment="center" heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile alignment="center" heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- heading only with link centered -->
  <div class="parent">
    <div class="child right-aligned-text">heading only with link centered</div>

    <div class="child">
      <calcite-tile alignment="center" href="/" heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile alignment="center" href="/" heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile alignment="center" href="/" heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- basic centered -->
  <div class="parent">
    <div class="child right-aligned-text">basic centered</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        mode="dark"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>

  <!-- link centered -->
  <div class="parent">
    <div class="child right-aligned-text">link centered</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>

  <!-- content-start & content-end slot centered (deprecated) -->
  <div class="parent">
    <div class="child right-aligned-text">content-start & content-end slot centered (deprecated)</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-start & content-end slot centered (deprecated) -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-start & content-end slot centered (deprecated)</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-tile
    ${boolean("active", false)}
    description="${text(
      "description",
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.",
    )}"
    ${boolean("disabled", false)}
    heading="${text("heading", "Tile heading lorem ipsum")}"
    ${boolean("hidden", false)}
    href="${text("href", "#")}"
    icon="${select("icon", iconNames, "layer")}"
    class="calcite-mode-dark"
    dir="rtl"
  >
  </calcite-tile>
`;
darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const contentTopBotton_TestOnly = (): string => html`
  <calcite-tile
    description="${text("description", "polygon layer")}"
    heading="${text("heading", "Percent of population that carpool to work")}"
    icon="layers"
  >
    <calcite-icon slot="content-top" icon="polygon"></calcite-icon>
    <calcite-icon slot="content-bottom" icon="launch"></calcite-icon>
  </calcite-tile>
`;

export const contentStartRTL_TestOnly = (): string => html`
  <calcite-tile
    description="${text("description", "polygon layer")}"
    heading="${text("heading", "Percent of population that carpool to work")}"
    dir="rtl"
  >
    <calcite-icon scale="s" slot="content-start" icon="polygon"></calcite-icon>
    <calcite-icon scale="s" slot="content-end" icon="launch"></calcite-icon>
  </calcite-tile>
`;

export const overflowingContent_TestOnly = (): string => html`
  <calcite-tile
    icon="2d-explore"
    heading="Example tile headinghfjkdlsahfjklsdahfjklsadhfjkldsahfjldkashfjdkalshfds;ahfjkldshafljkdsahfljksdahfdlsajkfhsadkljfhsdajklfhsdalkjfhdsalkjfhdsalf"
    description="Example tile description contenthfjdkslahfjkdsalhf sdajklfh ksdjahfljksadhfljkdsahfjklsdahfjlkdsahflkjdsahfjkdsahflkdjsahfldksajhfdsklajhfdsljkahfdsajkfhsadlkjfsadhfdsa"
    style="width:200px"
  ></calcite-tile>
`;

export const disabled_TestOnly = (): string => html`
  <calcite-tile
    ${boolean("active", false)}
    description="${text(
      "description",
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.",
    )}"
    ${boolean("disabled", false)}
    heading="${text("heading", "Tile heading lorem ipsum")}"
    ${boolean("hidden", false)}
    href="${text("href", "#")}"
    icon="${select("icon", iconNames, "layer")}"
  >
  </calcite-tile>
`;

export const widthSetToBreakpoints_TestOnly = (): string =>
  createBreakpointStories(
    html` <calcite-tile
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      heading="Tile title lorem ipsum"
      icon="layers"
      scale="{scale}"
    ></calcite-tile>`,
  );
