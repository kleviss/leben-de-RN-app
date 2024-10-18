import { Image, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/leben-de-app.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Einbürgerungstest</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText>Diese App hilft dir, die Anforderungen für den Einbürgerungstest zu verstehen und zu überprüfen.
      </ThemedText>
      <View style={{ height: 16 }} />
      <Collapsible title="Was ist der Einbürgerungstest?" open={true}>
        <ThemedText style={{ fontSize: 13 }}>
          Mit dem Einbürgerungstest werden in einem Einbürgerungsverfahren die erforderlichen Kenntnisse der Rechts- und Gesellschaftsordnung und der Lebensverhältnisse in Deutschland nachgewiesen.
          Insgesamt besteht der Gesamtfragenkatalog aus <ThemedText type="defaultSemiBold" style={{ fontSize: 13 }}> 300</ThemedText> bundesweiten und
          <ThemedText type="defaultSemiBold" style={{ fontSize: 13 }}> 160</ThemedText> bundeslandspezifischen Fragen.
          <ExternalLink href="https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Einbuergerung/gesamtfragenkatalog-lebenindeutschland.html?nn=282388">
            <ThemedText type="link" style={{ fontSize: 13 }}> Mehr Infos ↗</ThemedText>
          </ExternalLink>
        </ThemedText>


      </Collapsible>
      <Collapsible title="Allgemeines zum Test">
        <ThemedText style={styles.collapsibleText}>
          Das Bundesverwaltungsamt prüft Ihren Antrag und entscheidet, ob Sie einen Einbürgerungstest ablegen müssen. Ist ein Test erforderlich, werden Sie beim Bundesamt für Migration und Flüchtlinge (BAMF) angemeldet. Ihre deutsche Auslandsvertretung informiert Sie über alle Modalitäten und den Testzeitpunkt.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Testdurchführung und Ergebnis">
        <ThemedText style={styles.collapsibleText}>
          Die Zusammenstellung und Auswertung Ihres Tests liegt in der Zuständigkeit des BAMF. Das Ergebnis wird direkt dem Bundesverwaltungsamt übersandt. Die Teilnahmebescheinigung mit Ihrer Punktzahl erhalten Sie in der Regel mit der Einbürgerungsurkunde.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Ausnahmen">
        <ThemedText style={styles.collapsibleText}>
          Kinder unter 16 Jahren müssen keinen Einbürgerungstest ablegen. Der Test entfällt auch bei Krankheit, Behinderung oder altersbedingten Einschränkungen. Die erforderlichen Kenntnisse können auch anderweitig nachgewiesen werden, z.B. durch einen deutschen Schulabschluss oder ein Studium an einer deutschen Hochschule in relevanten Fachbereichen.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Testaufbau">
        <ThemedText style={styles.collapsibleText}>
          Der Einbürgerungstest besteht aus 33 Fragen. Bei jeder Frage müssen Sie aus vier möglichen Antworten die richtige auswählen. Sie bestehen den Test, wenn Sie mindestens 17 Fragen richtig beantworten.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Weitere Informationen">
        <ThemedText style={styles.collapsibleText}>
          Das BAMF bietet auf seiner Internetseite weitere Informationen, einen Probedurchlauf und den Gesamtkatalog der möglichen Fragen an. Im Online-Testcenter können Sie kostenlos einen Mustertestbogen ausfüllen.
        </ThemedText>
        <ExternalLink href="http://www.bamf.de/DE/Willkommen/Einbuergerung/OnlineTestcenter/online-testcenter-node.html">
          <ThemedText type="link" style={styles.collapsibleText}>BAMF Online-Testcenter ↗</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 478,
    width: 490,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  collapsibleText: {
    fontSize: 13,
  },
  collapsibleTextLink: {
    fontSize: 13,
  },
});
