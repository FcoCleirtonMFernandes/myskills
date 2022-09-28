import React, { useState, useEffect } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Platform,
    FlatList
} from 'react-native';

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

export function Home() {
    // vetor [estado, funcao] = useState();
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState([]);
    const [gretting, setGretting] = useState('');

    // handle - por conversão, usa esse termo para entender 
    // q he uma função disparada por usuario

    function handleAddNewSkill() {
        // oldState - pega stados anterior
        // oldState - ...oldState tudo anterior
        // newSkill - o novo digitado
        // oldState => [ React Native, TypeScript ]

        setMySkills(oldState => [...oldState, newSkill]);
    }

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour > 12){
            setGretting('Bom Dia!');
        } else if (currentHour >= 12 && currentHour <18 ){
            setGretting('Boa Tarde!');
        } else {
            setGretting('Bom Noite!');
        }
    }, [])

    return (
        <View style={styles.container }>

            <Text style={styles.title}>
                Welcome, Cleirton
            </Text>

            <Text style={[styles.title, { marginTop: 15}]}>
                {gretting}
            </Text>
            
            <TextInput
                style={styles.input}
                placeholder="New skill"
                placeholderTextColor="#555"
                onChangeText={setNewSkill}
            />

            <Button onPress={handleAddNewSkill}/>
            
            <Text style={[styles.title, { marginVertical: 50 }]}>
                My Skills
            </Text>
            

            {/* Modelo antigo, melhor usar FlatList
            {
                mySkills.map(skill => (
                    <SkillCard
                        key={skill} 
                        skill={skill}/>
                ))
            } */}

            <FlatList 
                data={mySkills}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <SkillCard skill={item} />
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 50,
        paddingVertical: 70
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input:{
        backgroundColor: '#1f1e25',
        color: '#FFF',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop:30,
        borderRadius: 10        
    }
});