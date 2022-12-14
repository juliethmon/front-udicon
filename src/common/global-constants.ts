import { Characteristic } from "src/app/characteristic";

export class GlobalConstants {

    public static mainColor : string = '#ffffff';
    public static sizeIcon : string = 'https://cdn2.iconfinder.com/data/icons/boxicons-regular-vol-1/24/bx-area-256.png';
    public static heightIcon : string = 'https://cdn2.iconfinder.com/data/icons/picol-vector/32/size_height-256.png';
    public static bathIcon : string = 'https://cdn3.iconfinder.com/data/icons/solid-amenities-icon-set/64/Towel_2-256.png';
    public static bethIcon : string = 'https://cdn3.iconfinder.com/data/icons/furniture-4-4/512/furniture_living_room_home_house_offie-09-256.png';
    public static chiqIcon : string = 'https://cdn4.iconfinder.com/data/icons/food-and-equipment-outline/32/spoon_holder-256.png';
    public static API: string = 'http://localhost:8002/api/v1/';

    public static cabaniaImg: string [] = [
        'https://as2.ftcdn.net/v2/jpg/02/42/69/71/1000_F_242697109_EezLjP5RPnBaDNejjdznDJhUjAVmE3DI.jpg',
        'https://as2.ftcdn.net/v2/jpg/03/22/91/27/1000_F_322912716_yWTkHeqvBSIxe8Xw6jFevchSClfHbp9P.jpg',
        'https://images.homify.com/c_fill,f_auto,h_500,q_auto,w_1280/v1467151077/p/photo/image/1564280/prefabricdas-madera.jpg'
    ];
    public static containerImg: string [] = [
    'https://as2.ftcdn.net/v2/jpg/02/42/69/71/1000_F_242697109_EezLjP5RPnBaDNejjdznDJhUjAVmE3DI.jpg',
    'https://as2.ftcdn.net/v2/jpg/03/22/91/27/1000_F_322912716_yWTkHeqvBSIxe8Xw6jFevchSClfHbp9P.jpg',
        'https://as1.ftcdn.net/v2/jpg/00/20/06/24/1000_F_20062484_lEcoz2QiKykWlJ0QD5CH48u2DNMryV7Z.jpg'
    ];

    public static cupulaImg: string [] = [
        'https://as1.ftcdn.net/v2/jpg/05/21/97/62/1000_F_521976289_EkDhRttFM2rqXMPPp3jUlEppR53uNo1w.jpg',
        'https://arquitectura-sostenible.es/wp-content/uploads/2018/04/CUPULA-22-840x442.jpg'
    ];

    public static cabaniaCharacteristics : Characteristic[] = [
        new Characteristic('Obras viales', 'UDICON se encarga de realizar obras viales y ha realizado proyectos para las vías ferreas y urbanas de la ciudad', this.sizeIcon),
        new Characteristic('Obras civiles', 'Realizamos obras civiles de diferente tipo para nuestros clientes', this.heightIcon),
        new Characteristic('Obras arquitectónicas', 'Diseñamos la arquitectura y el diseño de todos tus proyectos', this.bathIcon),
        new Characteristic('Asesorías', 'Realizamos asesorías personalizadas', this.bethIcon),
    ]
}