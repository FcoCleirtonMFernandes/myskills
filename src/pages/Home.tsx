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

interface SkillData {
    id: string;
    name: string;
}

export function Home() {
    // vetor [estado, funcao] = useState();
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [gretting, setGretting] = useState('');

    // handle - por conversão, usa esse termo para entender 
    // q he uma função disparada por usuario

    function handleAddNewSkill() {
        // oldState - ...oldState tudo anterior
        // newSkill - o novo digitado
        // oldState => [ React Native, TypeScript ]

        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }
        setMySkills(oldState => [...oldState, data]);
        setNewSkill(''); 
    }

    function handleRemoveSkill(id: string) {
        setMySkills(oldState => oldState.filter(
            skill => skill.id !== id
        ));
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
                Welcome, Cleirton!
            </Text>

            <Text style={[styles.title, { marginTop: 15}]}>
                {gretting}
            </Text>
            
            <TextInput
                style={styles.input}
                placeholder="New skill"
                placeholderTextColor="#555"
                onChangeText={setNewSkill}
                value={newSkill}
            />

            <Button 
                onPress={handleAddNewSkill}
                title="NOVO"
            />
            
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
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SkillCard 
                        skill={item.name}
                        onPress={() => handleRemoveSkill(item.id)}
                    />
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