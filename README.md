## Scrum Board - Inlämning 2 - Javascript 2 


#### Projekt på utbildningen:
[Front end webbutvecklare](https://gritacademy.se/front-end-webbutvecklare/) 400 YH-poäng - [Grit Academy](https://gritacademy.se/)  
(2023-2025)

#### Kurs
FE23 | Javascript 2
---

# Uppgiften

Du ska skapa en scrum board där en användare kan 
* Lägga till nya tasks som behöver utföras
* Assigna en person till en task
* Markera att en task är utförd
* Ta bort utförda tasks

Ingen extra funktionalitet är tillåtet att lägga till i den här inlämningen. 

1. Alla tasks hämtas och visas när sidan laddas. Varje task sorteras under rätt kolumn beroende på dess status.
2. Man kan lägga till en ny task genom ett form där man skriver vad tasken innebär och väljer en kategori, “ux”, “dev frontend” eller “dev backend”.  En task startar alltid med status “to do” och assigned “none”.
3. När en ny task har lagts till syns den direkt under To Do. Där kan man tilldela den till en person genom att fylla i ett namn och klicka på “Assign >>”.
4. Tasken ändrar nu status från “to do” till “in progress” och syns därför i kolumnen In Progress. Tasken har nu även ett nytt värde under assigned. I exemplet är det värdet “Clara”. Klickar man på knappen “Done >>” ändras status från “in progress” till “done”.
5. Nu syns tasken istället i kolumnen Done. Klickar man på Remove X tas den bort från firebase och visas inte längre på sidan.
6. Tasken är borttagen. 


## Krav
### Webbsidan
Webbsidan ska fungera så som det är beskrivet under “Beskrivning”. Det vill säga allt som går att göra i beskrivningen ska även gå att göra på din sida. Inga extra funktioner ska finnas med.

#### GUI
GUI:t ska följa screenshotsen under beskrivningen.

**Varje task ska sorteras under en kolumn**
* to do - dessa ska ha ett form för att tilldela 
* in progress - dessa ska gå att klicka fram till done
* done - dessa ska gå att ta bort
  
**Varje task ska ha en färg baserat på kategorierna**
* “ux”
* “dev frontend”
* “dev backend”
I övrigt väljer du själv hur webbsidan ska se ut.


### Koden
* Använd moduler
* Använd fetch för att skicka http requests. (Du kan alltså inte använda firebase-bibliotek)




