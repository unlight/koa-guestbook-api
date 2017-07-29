import { Connection } from 'typeorm';
import { Category } from '../category/category';
import { Message } from '../message/message';

export async function run(connection: Connection): Promise<any> {
    let c: Category;
    const categories = [
        (c = new Category(), c.name = 'Indestructibly', c),
        (c = new Category(), c.name = 'Anatreptic', c),
        (c = new Category(), c.name = 'Bedangled', c),
    ];
    await Promise.all(categories.map(c => connection.entityManager.persist(c)))
    let m: Message;
    const messages = [
        (m = new Message(), m.author = 'Reatha', m.dateInserted = '2012-08-19', m.body = 'sympathism laterodorsal superoccipital barkevikitic engrandizement rhopalic phryganeoid elegize upcurve Lapeirousia polyporoid chrysogen pantomorph reprover antrotympanic pleonic supracargo skeily blazonment boar precongenial incompassionateness format fluer', m),
        (m = new Message(), m.author = 'Annabelle', m.dateInserted = '2014-04-03', m.body = 'curvograph monumentalism batta concretive Stagonospora nonadditive melaxuma touching zoomechanical piercent inangulate mosesite exclusiveness toxication subrange sessional interviewer checkered Alick buaze eaves unremittable seapiece vaagmer', m),
        (m = new Message(), m.author = 'Frederica', m.dateInserted = '2014-01-21', m.body = 'terrar lyreflower foaly gurdwara scapulopexy premeditation ferriprussiate picqueter whute Hebrewism buttonholer anglimaniac daktylos Belshazzar punctualness indumentum elderwort hortite amazed dolichocephaly dentoid slashingly inaffability stevia', m),
        (m = new Message(), m.author = 'Trula', m.dateInserted = '2016-09-04', m.body = 'vergery haploperistomic nonmutationally nonmulched intermammary opianic desilverization chinaware unfortifiable intercosmically epichorial plumagery Paspalum undegraded perichondritis slantindicularly pugilistically myelomatosis intercostohumeral alias unrewarded brutish stagmometer pseudoreligious', m),
        (m = new Message(), m.author = 'Bebe', m.dateInserted = '2015-04-26', m.body = 'unimbowed otocranium liegedom tileworks triazane scunder unbarricadoed dunbird superlenient uranoscopia toodle sufficing kinology pyrryl schorlaceous coachway vestryman exteroceptor pothook azotemia vinaigrier begild balladical polymignite', m),
        (m = new Message(), m.author = 'Dennis', m.dateInserted = '2014-04-07', m.body = 'gobylike sprightful Antiochianism antisubmarine hogpen thievingly Honzo articularly telepathically revictualment beld maral trumpery Sinite relament quindecagon ordinator benefit sensate Almida propinquous starter monandry wheelroad', m),
        (m = new Message(), m.author = 'Alita', m.dateInserted = '2010-04-14', m.body = 'observance supercolumnar figureheadless stylate jinket executively compactedly Silybum tradesperson consecrator psaltery incumbency mesoxalate Catty inextricably wust crummy spectrometer whiffler preprimer Laplandic supergene inwreathe sticktail', m),
        (m = new Message(), m.author = 'Piedad', m.dateInserted = '2010-01-05', m.body = 'phalangiform psychopomp spinoid mastigopod pregainer pterygopodium claviature nailsick thaumaturgical bewail telethermometer Elaphurus parasternal Qung granulitize preformed remodify supraocclusion isoseismic selenate wyne Negritoid pentecostalist diazotype', m),
        (m = new Message(), m.author = 'Marg', m.dateInserted = '2010-06-12', m.body = 'schizogony valanced electropathy energeticist eyot feulamort uninterferedwith Biblicoliterary overland meeter illegibly trihedral preprovision gillstoup subsulfide fortuneless oraculousness herbarial aethogen outbow latching unaesthetic dispatcher unbountiful', m),
    ];
    messages[0].category = categories[0];
    messages[1].category = categories[1];
    await Promise.all(messages.map(_ => connection.entityManager.persist(_)))
}
